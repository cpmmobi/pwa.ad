import { NextResponse } from 'next/server';

// Mappings for Chinese translations
const SolutionMap: Record<string, string> = {
  'pwa_distribution': '封装为 PWA',
  'apk_distribution': '封装为 APK',
  'other': '其他'
};

const StageMap: Record<string, string> = {
  'new_product_testing': '测试新产品',
  'h5_ready_to_launch': 'H5就绪准备投放',
  'running_ads_improve_conversion': '投放中，需提升转化',
  'running_ads_attribution_issue': '投放中，归因不理想',
  'replace_or_optimize_existing_solution': '替换或优化现有方案'
};

const SpendMap: Record<string, string> = {
  'not_started': '尚未开始',
  'lt_100': '<$100/天',
  '100_500': '$100-$500/天',
  '500_2000': '$500-$2,000/天',
  '2000_10000': '$2,000-$10,000/天',
  'gt_10000': '>$10,000/天'
};

const RegionMap: Record<string, string> = {
  'sea': '东南亚',
  'india': '印度',
  'latam': '拉美',
  'middle_east': '中东',
  'jp_kr': '日韩',
  'africa': '非洲',
  'eu_us': '欧美',
  'other': '其他'
};

type Attribution = {
  clickIds?: Record<string, string>;
  utm?: Record<string, string>;
  landingPage?: string;
  referrer?: string;
  firstSeenAt?: string;
};

const CLICK_ID_LABELS: Record<string, string> = {
  gclid: 'Google Ads',
  gbraid: 'Google Ads',
  wbraid: 'Google Ads',
  fbclid: 'Meta',
  ttclid: 'TikTok',
  msclkid: 'Microsoft Ads',
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      landingUrl, 
      telegram, 
      email,
      primarySolution, 
      primarySolutionOther,
      campaignStage,
      dailyAdSpend,
      targetRegions, 
      targetRegionsOther, 
      additionalNotes,
      attribution,
      source_info, 
      locale 
    } = data;

    // Get IP address
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'Unknown IP';

    // Attribution is captured on the landing page and persisted client-side,
    // because ad click ids are dropped as soon as the visitor navigates away.
    const attr = (attribution ?? {}) as Attribution;
    const clickIds = attr.clickIds ?? {};
    const utm = attr.utm ?? {};

    let sourceText = '直接访问';

    if (attr.referrer) {
      try {
        sourceText = `引荐访问 (${new URL(attr.referrer).hostname})`;
      } catch {
        sourceText = `引荐访问 (${attr.referrer})`;
      }
    }

    const clickIdEntries = Object.entries(clickIds);
    if (utm.utm_source) {
      sourceText = `付费投放 (${utm.utm_source} / ${utm.utm_medium || 'unknown'})`;
    } else if (clickIdEntries.length > 0) {
      sourceText = `付费投放 (${CLICK_ID_LABELS[clickIdEntries[0][0]] || clickIdEntries[0][0]})`;
    }

    const keyword = utm.utm_term || utm.utm_content;
    const keywordInfo = keyword ? `\n🔑 关键词/素材: ${keyword}` : '';
    const campaignInfo = utm.utm_campaign ? `\n📣 广告系列: ${utm.utm_campaign}` : '';
    const clickIdInfo = clickIdEntries.length
      ? `\n🆔 点击ID: ${clickIdEntries.map(([k, v]) => `${k}=${v}`).join(' | ')}`
      : '';
    const landingInfo = attr.landingPage ? `\n🚪 落地页: ${attr.landingPage}` : '';
    const firstSeenInfo = attr.firstSeenAt ? `\n⏱️ 首次访问: ${attr.firstSeenAt}` : '';

    // Format Chinese Message
    const solutionCN = SolutionMap[primarySolution as string] || primarySolution;
    const solutionDetailStr = primarySolutionOther ? ` (${primarySolutionOther})` : '';
    
    const stageCN = StageMap[campaignStage as string] || campaignStage;
    const spendCN = SpendMap[dailyAdSpend as string] || dailyAdSpend;

    const regionsList = Array.isArray(targetRegions) ? targetRegions : [targetRegions];
    const regionsCN = regionsList.map((r: string) => RegionMap[r] || r).join(', ');
    const regionDetailStr = targetRegionsOther ? ` (${targetRegionsOther})` : '';
    
    const notesStr = additionalNotes ? `\n📝 补充说明: ${additionalNotes}` : '';

    const lang = locale === 'zh' ? '中文' : (locale === 'en' ? 'English' : locale);

    const contactLines = [
      telegram ? `📱 Telegram: ${telegram}` : null,
      email ? `📧 邮箱: ${email}` : null,
    ].filter(Boolean).join('\n');

    const text = `🎯 来新客户线索啦！！请在4小时内回复
🔗 落地页链接: ${landingUrl}
${contactLines}
💡 需求方案: ${solutionCN}${solutionDetailStr}
📊 投放阶段: ${stageCN}
💰 日均消耗: ${spendCN}
🌍 目标区域: ${regionsCN}${regionDetailStr}${notesStr}
--------------------------------
🔗 访问来源: ${sourceText}${keywordInfo}${campaignInfo}${clickIdInfo}${landingInfo}${firstSeenInfo}
--------------------------------
🗣️ 网页语言: ${lang}
🌐 浏览器语言: ${source_info?.browserLanguage || 'Unknown'}
🌐 用户IP: ${ip}
💻 设备信息: ${source_info?.userAgent || 'Unknown'}`;

    const webhookUrl = process.env.LARK_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('LARK_WEBHOOK_URL is not set');
      throw new Error('Notification is not configured');
    }

    const larkResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        msg_type: 'text',
        content: {
          text: text,
        },
      }),
    });

    const responseData = await larkResponse.json();

    if (!larkResponse.ok || responseData.code !== 0) {
      console.error('Lark API error:', responseData);
      throw new Error(responseData.msg || 'Failed to send to Lark');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit form' }, { status: 500 });
  }
}
