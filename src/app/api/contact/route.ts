import { NextResponse } from 'next/server';

// Mappings for Chinese translations
const BusinessTypeMap: Record<string, string> = {
  'real_money': '真金游戏',
  'live_entertainment': '娱乐直播',
  'drama_novel': '短剧小说',
  'finance_loan': '金融贷款',
  'tools': '工具应用',
  'other': '其他类型'
};

const RegionMap: Record<string, string> = {
  'sea': '东南亚',
  'india': '印度',
  'latam': '拉美',
  'mena': '中东',
  'russia': '俄罗斯',
  'jp_kr': '日韩',
  'africa': '非洲',
  'other': '其他'
};

const NeedMap: Record<string, string> = {
  'pwa': 'PWA 封装',
  'w2a': 'W2A 封装',
  'both': '我都要',
  'other': '其他'
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { company, business_type, telegram, regions, region_detail, need, need_detail, source_info, locale } = data;

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
    const businessTypeCN = BusinessTypeMap[business_type as string] || business_type;
    
    const regionsList = Array.isArray(regions) ? regions : [regions];
    const regionsCN = regionsList.map((r: string) => RegionMap[r] || r).join(', ');
    const regionDetailStr = region_detail ? ` (${region_detail})` : '';
    
    const needCN = NeedMap[need as string] || need;
    const needDetailStr = need_detail ? ` (${need_detail})` : '';

    const lang = locale === 'zh' ? '中文' : (locale === 'en' ? 'English' : locale);

    const text = `🎯 来新客户线索啦！！请在4小时内回复
🏢 业务名称/链接: ${company}
💼 业务类型: ${businessTypeCN}
📱 Telegram: ${telegram}
🌍 目标区域: ${regionsCN}${regionDetailStr}
💡 需求类型: ${needCN}${needDetailStr}
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
