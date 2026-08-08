import { NextResponse } from 'next/server';

// Mappings for Chinese translations
const SolutionMap: Record<string, string> = {
  'pwa_distribution': '封装为 PWA',
  'apk_distribution': '封装为 APK',
  'ad_platform_approval': '广告过审方案',
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

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { 
      landingUrl, 
      telegram, 
      primarySolution, 
      primarySolutionOther,
      campaignStage,
      dailyAdSpend,
      targetRegions, 
      targetRegionsOther, 
      additionalNotes,
      source_info, 
      locale 
    } = data;

    // Get IP address
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'Unknown IP';

    // Parse Source Info
    let sourceText = '直接访问';
    let keywordInfo = '';
    
    if (source_info?.referrer) {
      try {
        const referrerUrl = new URL(source_info.referrer);
        if (referrerUrl.hostname !== new URL(source_info.url).hostname) {
           sourceText = `引荐访问 (${referrerUrl.hostname})`;
        }
      } catch (e) {
        sourceText = `引荐访问 (${source_info.referrer})`;
      }
    }

    if (source_info?.url) {
      try {
        const urlObj = new URL(source_info.url);
        const params = urlObj.searchParams;
        
        // Check for common ad tracking parameters
        if (params.has('gclid') || params.has('fbclid')) {
          sourceText = '付费投放';
        }
        
        // Check for UTM parameters
        const utmSource = params.get('utm_source');
        const utmMedium = params.get('utm_medium');
        const utmTerm = params.get('utm_term'); // Keyword
        
        if (utmSource) {
          sourceText = `付费投放 (${utmSource} / ${utmMedium || 'unknown'})`;
        }
        
        if (utmTerm) {
          keywordInfo = `\n🔑 搜索关键词: ${utmTerm}`;
        } else if (params.get('keyword') || params.get('q')) {
             keywordInfo = `\n🔑 搜索关键词: ${params.get('keyword') || params.get('q')}`;
        }
      } catch (e) {
        // URL parse error, ignore
      }
    }

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

    const text = `🎯 来新客户线索啦！！请在4小时内回复
🔗 落地页链接: ${landingUrl}
📱 Telegram: ${telegram}
💡 需求方案: ${solutionCN}${solutionDetailStr}
📊 投放阶段: ${stageCN}
💰 日均消耗: ${spendCN}
🌍 目标区域: ${regionsCN}${regionDetailStr}${notesStr}
--------------------------------
🗣️ 网页语言: ${lang}
🌐 浏览器语言: ${source_info?.browserLanguage || 'Unknown'}
🌐 用户IP: ${ip}
🔗 访问来源: ${sourceText}${keywordInfo}
💻 设备信息: ${source_info?.userAgent || 'Unknown'}`;

    const larkResponse = await fetch('https://open.larksuite.com/open-apis/bot/v2/hook/36d658e1-06a8-4e5b-a15f-4dfd7dac2b9c', {
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
