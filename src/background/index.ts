import {browser} from 'webextension-polyfill-ts';
import jsonata from "jsonata";
import {SyringeScript} from "../interface";
const matchUrl = require("match-url-wildcard");

const script: SyringeScript = {
    "name": "",
    "key": "eh",
    "version": "0.1",
    "author": [""],
    "description": "",
    "match": ["e-hentai.org", "exhentai.org"],
    "data": { // 存储数据
        "tags": [
            {"namespace": "parody", "key": "touhou project", "name": "东方系列"}
        ]
    },
    "modules": [ // 模块
        {
            "performer": "DOMReplace", // dom替换模块
            "parameter": {
                "rules": [
                    {
                        "nodeName": ["#TEXT"], // 遍历节点匹配nodename
                        "dictionary": {
                            'Report Gallery': '举报图库',
                            'Archive Download': '存档下载',
                            'Torrent Download': '种子下载',
                            'Petition to Expunge': '申请删除',
                            'Petition to Rename': '申请重命名',
                            ' Read Later': ' 稍后再读',
                            ' Added to Read Later': ' 已添加稍后再读',
                            'language:': '语言:',
                            'parody:': '原作:',
                            'character:': '角色:',
                            'group:': '社团:',
                            'artist:': '作者:',
                            'female:': '女性:',
                            'male:': '男性:',
                            'misc:': '其他:',
                            'reclass:': '重分类:',

                            'Posted:': '发布于:',
                            'Parent:': '父级:',
                            'Visible:': '显示:',
                            'Language:': '语言:',
                            'File Size:': '文件大小:',
                            'Length:': '页数:',
                            'Favorited:': '收藏:',
                            'Rating:': '评分:',
                            'Average:': '平均:',
                            ' Add to Favorites': ' 添加到收藏夹',
                            'Normal': '普通',
                            'Large': '大图',
                            ' Normal': '普通',
                            ' Large': '大图',

                            '4 rows': '4 行',
                            '10 rows': '10 行',
                            '20 rows': '20 行',
                            '40 rows': '40 行',

                            'Score ': '分数 ',
                            'Uploader Comment': '上传者评论',

                            'Vote+': '赞',
                            'Vote-': '踩',

                            'Vote Up': '赞',
                            'Vote Down': '踩',

                            'Show Tagged Galleries': '含有该标签的图库',
                            'Show Tag Definition': '显示标签介绍',
                            'Add New Tag': '添加新标签',

                            'Post New Comment': '发送新的评论',

                            'Front Page': '首页',

                            'Watched': '关注',
                            'Popular': '流行',
                            'Torrents': '种子',
                            'Home': '首页',

                            'Settings': '设置',
                            'My ': '我的',
                            'My Home': '我的首页',
                            'Uploads': '上传',
                            'Toplists': '排行榜',
                            'Bounties': '悬赏',
                            'News': '新闻',
                            'Forums': '论坛',
                            'My Tags': '我的标签',
                            'Wiki': '维基',

                            'Doujinshi': '同人本',
                            'Manga': '漫画',
                            'Artist CG': '画师集',
                            'Artist CG Sets': '画师集',
                            'Game CG': '游戏集',
                            'Game CG Sets': '游戏集',
                            'Western': '西方',
                            'Non-H': '非H',
                            'Image Set': '图集',
                            'Image Sets': '图集',
                            // 'Cosplay': '',
                            'Asian Porn': '亚洲色情',
                            'Misc': '其他',

                            'Show Advanced Options': '显示高级选项',
                            'Show File Search': '文件搜索',
                            'E-Hentai Galleries: The Free Hentai Doujinshi, Manga and Image Gallery System': 'E-Hentai: 一个免费的绅士同人本、漫画和图片的图库系统',
                            'Visit the E-Hentai Forums': '前往 E-Hentai 论坛',
                            'Play the HentaiVerse Minigame': '玩 HentaiVerse 小游戏',
                            'Lo-Fi Version': '低保真版本',
                            'Please read the ': '请阅读',
                            'Terms of Service': '服务条款',
                            ' before participating with or uploading any content to this site.': '后再使用该网站或上传资源。',

                            'Enter new tags, separated with comma': '输入新标签, 用逗号分隔',
                            'Search Keywords': '搜索关键词',

                            'Enter a single tag to flag, watch or hide': '输入一个标签，来标记、关注或隐藏',
                            ' Watched': ' 关注',
                            ' Hidden': ' 隐藏',
                            ' Enable': '启用',
                            'Action:': '操作：',
                            'Save': '保存',
                            '#default': '#默认',
                            'Select All': '全选',
                            'Delete Selected': '删除选中项',
                            'Confirm Delete': '确认删除',

                            'Selected Profile:': '当前配置：',
                            'Image Load Settings': '图片加载设置',
                            'Do you wish to load images through the Hentai@Home Network, if available?': '如果可用，是否希望通过 Hentai@Home 网络加载图像？',
                            ' Yes (Recommended)': ' 是（推荐）',
                            ' No (You will not be able to browse as many pages. Enable only if having problems.)': ' 否（配额消耗会加快。只有出现问题时才启用。）',
                            'Image Size Settings': '图片大小设置',
                            'Normally, images are resampled to 1280 pixels of horizontal resolution for online viewing. You can alternatively select one of the following resample resolutions. To avoid murdering the staging servers, resolutions above 1280x are temporarily restricted to donators, people with any hath perk, and people with a UID below 3,000,000.':
                                '通常情况，图像将重采样到 1280 像素宽度以用于在线浏览，您也可以选择以下重新采样分辨率。' +
                                '但是为了避免负载过高，高于 1280 像素将只供给于赞助者、特殊贡献者，以及 UID 小于 3,000,000 的用户。',

                            'Gallery Name Display': '图库的名字显示',
                            'Archiver Settings': '归档设置',
                            'Front Page Settings': '首页设置',
                            'Favorites': '收藏',
                            'Ratings': '评分',
                            'Tag Namespaces': '标签组',
                            'Excluded Languages': '排除语言',
                            'Search Result Count': '搜索结果数',
                            'Thumbnail Settings': '缩略图设置',
                            'Gallery Comments': '图库评论',
                            'Gallery Tags': '图库标签',
                            'Gallery Page Numbering': '图库页面页码',
                            'Hentai@Home Local Network Host': 'Hentai@Home 本地网络服务器',
                            'Original Images': '原始图像',

                            'Horizontal:': '宽/横向',
                            'Vertical:': '高/纵向',
                            ' pixels': ' 像素',

                            ' reclass': ' 重新分类',
                            ' language': ' 语言',
                            ' parody': ' 原作',
                            ' character': ' 角色',
                            ' group': ' 社团',
                            ' artist': ' 作者',
                            ' male': ' 男性',
                            ' female': ' 女性',

                            'Thumbnail Scaling': '缩略图缩放',
                            'Thumbnails on the thumbnail and extended gallery list views can be scaled to a custom value between 75% and 150%.':
                                '可以缩放为 75% 到 150% 之间的自定义值。',

                            'Viewport Override': '移动端虚拟宽度',
                            'Allows you to override the virtual width of the site for mobile devices. This is normally determined automatically by your device based on its DPI. Sensible values at 100% thumbnail scale are between 640 and 1400.':
                                '允许你覆盖移动设备的虚拟宽度，默认是根据 DPI 自动计算的，100% 缩略图比例下的合理值在 640 到 1400 之间。',

                            'Tag Filtering Threshold': '标签筛选阈值',
                            'Tag Watching Threshold': '标签订阅阈值',

                            'Excluded Uploaders': '屏蔽的上传者',
                            'If you wish to hide galleries from certain uploaders from the gallery list and searches, add them below. Put one username per line.':
                                '如果你希望再图库中和搜索中隐藏某个上传者的话，请把他们的用户名填写再下方，每行一个。',
                            'Note that galleries from these uploaders will never appear regardless of your search query.':
                                '注意：无论你如何搜索，这些上传者都不会出现。',

                            'Many galleries have both an English/Romanized title and a title in Japanese script. Which gallery name would you like as default?':
                                '很多图库都同时拥有英文或者日文标题，你想默认显示哪一个？',

                            ' Default Title': '默认标题（英文）',
                            ' Japanese Title (if available)': '日文标题（如果有）',

                            'Each letter represents one star. The default RRGGB means R(ed) for the first and second star, G(reen) for the third and fourth, and B(lue) for the fifth. You can also use (Y)ellow for the normal stars. Any five-letter R/G/B/Y combo works.':
                                '每一个字幕代表一颗星, 默认的 RRGGB 表示第一第二颗星显示为红色 R(ed)，第三第四颗星现为是绿色 G(reen)，第五颗星显示为蓝色 B(lue)。你可以使用黄色来表示普通的星，R/G/B/Y 任何五个组合都是有效的。',

                            'While the site will automatically scale down images to fit your screen width, you can also manually restrict the maximum display size of an image. Like the automatic scaling, this does not resample the image, as the resizing is done browser-side. (0 = no limit)': '虽然图片会自动根据窗口缩小，你也可以手动设置最大大小，图片并没有重新采样（0为不限制）',
                            'The default behavior for the Archiver is to confirm the cost and selection for original or resampled archive, then present a link that can be clicked or copied elsewhere. You can change this behavior here.': '默认归档下载方式为手动选择（原画质或压缩画质），然后手动复制或点击下载链接。你可以修改归档下载方式。',
                            'Which display mode would you like to use on the front and search pages?': '你想在搜索页面显示哪种样式？',
                            'What categories would you like to show by default on the front page and in searches?': '你希望在首页上看到哪些类别？',
                            'Here you can choose and rename your favorite categories.': '在这里你可以重命名你的收藏夹',
                            'You can also select your default sort order for galleries on your favorites page. Note that favorites added prior to the March 2016 revamp did not store a timestamp, and will use the gallery posted time regardless of this setting.': '你也可以选择收藏夹中默认排序。请注意，2016 年 3 月改版之前加入收藏夹的画册并未保存收藏时间，会以画册发布时间代替。',
                            'If you want to exclude certain namespaces from a default tag search, you can check those below. Note that this does not prevent galleries with tags in these namespaces from appearing, it just makes it so that when searching tags, it will forego those namespaces.': '如果要从默认标签搜索中排除某些标签组，可以检查以下内容。请注意，这不会阻止在这些标签组中的标签的展示区出现，它只是在搜索标签时排除这些标签组。',
                            'You can soft filter tags by adding them to My Tags with a negative weight. If a gallery has tags that add up to weight below this value, it is filtered from view. This threshold can be set between 0 and -9999.': '你可以通过将标签加入「我的标签」并设置一个负权重来软过滤它们。如果一个作品所有的标签权重之和低于设定值，此作品将从视图中被过滤。这个值可以设定在 0 到 -9999。',
                            'Recently uploaded galleries will be included on the watched screen if it has at least one watched tag with positive weight, and the sum of weights on its watched tags add up to this value or higher. This threshold can be set between 0 and 9999.': '你可以通过将标签加入「我的标签」并设置一个正权重来关注它们。如果一个最近上传的作品所有标签的权重之和高于设定值，则它将会被包含在「关注」里。这个值可以设定在 0 到 9999。',
                            'If you wish to hide galleries in certain languages from the gallery list and searches, select them from the list below.': '如果您希望以图库列表中的某些语言隐藏图库并进行搜索，请从下面的列表中选择它们。',
                            'Note that matching galleries will never appear regardless of your search query.': '请注意，无论搜索查询如何，匹配的图库都不会出现。',
                            'How many results would you like per page for the index/search page and torrent search pages? (Hath Perk: Paging Enlargement Required)': '搜索页面每页显示多少条数据？（Hath Perk：付费扩展）',
                            'How would you like the mouse-over thumbnails on the front page to load when using List Mode?': '你希望鼠标悬停缩略图何时加载？',
                            'You can set a default thumbnail configuration for all galleries you visit.': '图库页面缩略图设置',
                            'Sort order for gallery comments:': '评论排序方式：',
                            'Show gallery comment votes:': '显示评论投票数：',
                            'Sort order for gallery tags:': '图库标签排序方式：',
                            'Show gallery page numbers:\n\t': '显示图库页码：\n\t',
                            'This setting can be used if you have a H@H client running on your local network with the same public IP you browse the site with. Some routers are buggy and cannot route requests back to its own IP; this allows you to work around this problem.': '如果你本地安装了 H@H 客户端，本地 IP 与浏览网站的公共 IP 相同，一些路由器不支持回流导致无法访问到自己，你可以设置这里来解决。',
                            'If you are running the client on the same PC you browse from, use the loopback address (127.0.0.1:port). If the client is running on another computer on your network, use its local network IP. Some browser configurations prevent external web sites from accessing URLs with local network IPs, the site must then be whitelisted for this to work.': '如果在同一台电脑上访问网站和运行客户端，请使用本地回环地址(127.0.0.1:端口号)。如果客户端在网络上的其他计算机运行，请使用那台机器的内网 IP。某些浏览器的配置可能阻止外部网站访问本地网络，你必须将网站列入白名单才能工作。',
                            'Use original images instead of the resampled versions where applicable?': '当可用的时候，使用原始图像代替压缩过的版本？',

                            ' Manual Select, Manual Start (Default)': ' 手动选择，手动下载（默认）',
                            ' Manual Select, Auto Start': ' 手动选择，自动下载',
                            ' Auto Select Original, Manual Start': ' 自动选择原始画质，手动下载',
                            ' Auto Select Original, Auto Start': ' 自动选择原始画质，自动下载',
                            ' Auto Select Resample, Manual Start': ' 自动选择压缩画质，手动下载',
                            ' Auto Select Resample, Auto Start': ' 自动选择压缩画质，自动下载',
                            'List View': '列表视图',
                            'Thumbnail View': '缩略图视图',
                            ' Auto': '自动',
                            ' By last gallery update time': '以最新的画册更新时间排序',
                            ' By favorited time': '以收藏时间排序',
                            ' 25 results': '25 个',
                            ' 50 results': '50 个',
                            ' 100 results': '100 个',
                            ' 200 results': '200 个',
                            ' On mouse-over (pages load faster, but there may be a slight delay before a thumb appears)': '鼠标悬停时 (页面加载快，缩略图加载有延迟)',
                            ' On page load (pages take longer to load, but there is no delay for loading a thumb after the page has loaded)': '页面加载时 (页面加载时间更长，但是显示的时候无需等待)',
                            ' Oldest comments first': '最早的评论',
                            ' Recent comments first': '最新的评论',
                            ' By highest score': '分数最高',
                            ' On score hover or click': '悬停或点击时',
                            ' Always': '总是',
                            ' Alphabetical': '按字母排序',
                            ' By tag power': '按标签权重',
                            ' No': '否',
                            ' Yes': '是',
                            ' Yup, I can take it': '好的，我可以接受更多的配额消耗',

                            'Size:': '大小：',
                            'Rows:': '行数：',
                            'pixels': '像素',
                            'Original': '原始语言',
                            'Translated': '翻译版',
                            'Rewrite': '改编版',
                            'All': '所有',
                            'Japanese': '日文',
                            'English': '英文',
                            'Chinese': '中文',
                            'Dutch': '荷兰语',
                            'French': '法语',
                            'German': '德语',
                            'Hungarian': '匈牙利',
                            'Italian': '意呆利',
                            'Korean': '韩语',
                            'Polish': '波兰语',
                            'Portuguese': '葡萄牙语',
                            'Russian': '俄语',
                            'Spanish': '西班牙语',
                            'Thai': '泰语',
                            'Vietnamese': '越南语',
                            'N/A': '无效',
                            'Other': '其他',

                            'Japanese \xA0': '日文 \xA0',
                            'English \xA0': '英文 \xA0',
                            'Chinese \xA0': '中文 \xA0',
                            'Dutch \xA0': '荷兰语 \xA0',
                            'French \xA0': '法语 \xA0',
                            'German \xA0': '德语 \xA0',
                            'Hungarian \xA0': '匈牙利 \xA0',
                            'Italian \xA0': '意呆利 \xA0',
                            'Korean \xA0': '韩语 \xA0',
                            'Polish \xA0': '波兰语 \xA0',
                            'Portuguese \xA0': '葡萄牙语 \xA0',
                            'Russian \xA0': '俄语 \xA0',
                            'Spanish \xA0': '西班牙语 \xA0',
                            'Thai \xA0': '泰语 \xA0',
                            'Vietnamese \xA0': '越南语 \xA0',
                            'Use Posted': '发布时间',
                            'Posted': '发布时间',
                            'Use Favorited': '收藏时间',
                            'Favorited': '收藏时间',
                            'Search:': '搜索:',
                            ' Name': ' 名称',
                            ' Tags': ' 标签',
                            ' Note': ' 备注',
                            'Show All Favorites': '显示所有收藏夹',
                            'Minimal': '最小化',
                            'Minimal+': '最小化 + 关注标签',
                            'Compact': '紧凑 + 标签',
                            'Extended': '扩展',
                            'Thumbnail': '缩略图',

                            'Published': '发布时间',
                            'Title': '标题',
                            'Uploader': '上传者',

                            'Search Gallery Name': '搜索名称',
                            'Search Gallery Tags': '搜索标签',
                            'Search Gallery Description': '搜索介绍',
                            'Search Torrent Filenames': '搜素种子文件名',
                            'Only Show Galleries With Torrents': '只显示有种子的图库',
                            'Search Low-Power Tags': '搜索低权值标签',
                            'Search Downvoted Tags': '搜索已投过反对票的标签',
                            'Show Expunged Galleries': '显示已经删除的库',
                            'Minimum Rating:': '最低评分',
                            'Between ': '介于 ',
                            ' and ': ' 和 ',
                            ' pages': ' 页',
                            // 'Hide Advanced Options': '隐藏高级选项',
                            'Disable default filters for: ': '禁用默认筛选器',
                            'Language': '语言',
                            'Tags': '标签',

                            '2 stars': '2 星',
                            '3 stars': '3 星',
                            '4 stars': '4 星',
                            '5 stars': '5 星',

                            'Status: ': '状态：',
                            'Seeded': '有种',
                            'Unseeded': '无种',
                            ' \xA0 \xA0 \xA0 \xA0 Show: ': ' |  显示：',
                            'All Torrents': '所有种子',
                            'Only My Torrents': '只显示我的',
                            '\nNote that you cannot add torrents directly to this page. To upload torrents to this system, visit the torrent screen for a gallery.\n':
                                '注意：你不能直接把种子添加到此页面。请在图库中上传。',
                            'Search Torrents': '搜索种子',

                            'Added': '添加于',
                            'Torrent Name': '种子名',
                            'Gallery': '图库 ID',
                            'Size': '体积',
                            'Seeds': '做种',
                            'Peers': '下载',
                            'Seeds:': '做种：',
                            'Peers:': '下载：',
                            'DLers': '下载',
                            'Downloads:': '完成：',
                            'Completes': '完成',
                            'DLs': '完成',
                            'Galleries All-Time': '所有时间',
                            'Galleries Past Year': '过去一年',
                            'Galleries Past Month': '过去一个月',
                            'Galleries Yesterday': '昨天',

                            'Gallery Toplists': '图库排行',
                            'Uploader Toplists': '上传者排行',
                            'Uploader All-Time': '所有时间',
                            'Uploader Past Year': '过去一年',
                            'Uploader Past Month': '过去一个月',
                            'Uploader Yesterday': '昨天',

                            'Tagging Toplists': '标记者排行',
                            'Tagging All-Time': '所有时间',
                            'Tagging Past Year': '过去一年',
                            'Tagging Past Month': '过去一个月',
                            'Tagging Yesterday': '昨天',

                            'Hentai@Home Toplists': 'Hentai@Home 排行',
                            'Hentai@Home All-Time': '所有时间',
                            'Hentai@Home Past Year': '过去一年',
                            'Hentai@Home Past Month': '过去一个月',
                            'Hentai@Home Yesterday': '昨天',

                            'EHTracker Toplists': '做种排行',
                            'EHTracker All-Time': '所有时间',
                            'EHTracker Past Year': '过去一年',
                            'EHTracker Past Month': '过去一个月',
                            'EHTracker Yesterday': '昨天',

                            'Rating & Reviewing Toplists': '打分&评论排行',
                            'Rating & Reviewing All-Time': '所有时间',
                            'Rating & Reviewing Past Year': '过去一年',
                            'Rating & Reviewing Past Month': '过去一个月',
                            'Rating & Reviewing Yesterday': '昨天',

                            'EHG Toplists': 'EHG 排行榜',

                            ' toplist': '排行',
                            'Image Limits': '图片限制',
                            'You are currently: ': '你位于:',
                            'on the ': ' 在 ',
                            'Total GP Gained': '获得的总GP',
                            'GP from gallery visits': 'GP 来自图库浏览',
                            'GP from torrent completions': 'GP 来自种子完成',
                            'GP from archive downloads': 'GP 来自存档下载',
                            'GP from Hentai@Home': 'GP 来自 Hentai@Home',
                            ' uploaded': '已上传',
                            'downloaded': '已下载',
                            'up/down ratio': '分享比',
                            'torrent completes': '完成种子',
                            'gallery completes': '完成图库',
                            'seedmins': '做种时长',
                            'Show My Torrents': '显示我的种子',
                            'If you misplace any of your personalized torrents, hit the button below to reset your key.':
                                '如果你错误的分发了个性化种子，请点击下面的按钮重置您的 KEY。',
                            'This will immediately invalidate all of your personalized torrents in play.':
                                '这将立即注销您所有的个性化种子。',
                            'Your current key is: ': '你当前的 KEY 是：',
                            'EHTracker': '种子追踪器',
                            '\n\t\t\tYou are currently not featured on any toplists...\n\t\t': '您当前没有上榜……',
                            'Moderation Power': '愿力',
                            'Current Moderation Power': '当前愿力',
                            'Base': '基础',
                            'Awards': '奖励',
                            'Tagging': '打标签',
                            'Level': '等级',
                            'Donations': '捐赠',
                            'Forum Activity': '论坛活跃',
                            'Uploads/H@H': '上传 / H@H',
                            'Account Age': '账户资历',
                            '(capped to 25)': '（不超过 25）',

                            'Overview': '概况',
                            'My Stats': '我的统计',
                            'My Settings': '我的设置',
                            'Hath Exchange': 'Hath 交易',
                            'GP Exchange': 'GP 交易',
                            'Credit Log': 'Credit 记录',
                            'Karma Log': 'Karma 记录',
                            'Apply Filter': '应用筛选',
                            'Clear Filter': '清理筛选',
                            'Estimated Size:   ': '预计大小:   ',
                            'Download Cost:   ': '下载费用:   ',
                            'Download Original Archive': '下载原始档案',
                            'Download Resample Archive': '下载重采样档案',
                            'No hits found': '什么也没有',
                            'No unfiltered results in this page range. You either requested an invalid page or used too aggressive filters.': '在此页面范围内没有未被过滤的结果。你的过滤设置可能过于激进。',
                            'Uploader:': '上传者:',
                            'New Torrents:': '新种子:',
                            'Information': '信息',
                            'Close Window': '关闭窗口',
                            'Upload Torrent': '上传种子',
                            '\n\t\tYou can add a torrent for this gallery by uploading it here. The maximum torrent file size is 10 MB.':
                                '您可以在这里上传来为此库添加种子。最大 Torrent 文件大小为 10MB。',
                            '\n\t\tNote that you have to download the finished torrent from this site after uploading for stats to be recorded.\n\t':
                                '请注意，您必须在上传后从该站点下载个性化种子，以便记录统计信息。',
                            '\n\t\tIf you are creating the torrent yourself, set this as announce tracker: ':
                                '如果您自己创建 Torrent，请将其设置为 AnnounceTracker：',
                            'Personalized Torrent': '个性化种子',
                            'Redistributable Torrent': '可再分发种子',
                            '(Just For You - this makes sure to record your stats)\n': '(只属于你 - 确保记录你的下载统计信息)',
                            '(use if you want a file you can post or give to others)': '(如果您想再发布或提供给其他人使用)',
                            'Back to Index': '返回',
                            'Vote to Expunge': '投票删除',
                            'No comments were given for this torrent.': '没有对这个种子的评论',
                            'Please choose a color to file this favorite gallery under. You can also add a note to it if you wish.':
                                '请选择一个颜色标记你的收藏，你也可以加一些备注。',
                            'Favorite Note (Max 200 Characters)': '收藏备注（最多 200 字符）',
                            'Add to Favorites': '添加到收藏',
                            'Favorites 0': '收藏夹 0',
                            'Favorites 1': '收藏夹 1',
                            'Favorites 2': '收藏夹 2',
                            'Favorites 3': '收藏夹 3',
                            'Favorites 4': '收藏夹 4',
                            'Favorites 5': '收藏夹 5',
                            'Favorites 6': '收藏夹 6',
                            'Favorites 7': '收藏夹 7',
                            'Favorites 8': '收藏夹 8',
                            'Favorites 9': '收藏夹 9',

                            'It is the dawn of a new day!': '新的一天开始了！',
                            'Reflecting on your journey so far, you find that you are a little wiser.': '回想一下你迄今为止的旅程，你发现你更聪明了。',
                            'You gain ': '你获得了 ',
                            ' EXP, ': ' 经验, ',
                            ' Credits!': ' Credits!',
                            'Back to Gallery': '返回图库',
                            'Report Type': '举报类型',
                            '[Select a complaint type...]': '[请选择一个举报类型...]',
                            'DMCA/Copyright Infringement': 'DMCA / 侵犯版权',
                            'Child Pornography': '儿童色情',
                            'Other Illicit Content': '其他非法内容',
                            'Watched Tag Galleries': '标签订阅',
                            'Currently Popular Recent Galleries': '目前最受欢迎的图库',
                            'Search Favorites': '搜索收藏夹',
                            'Clear': '清除',
                            'Delete Favorites': '删除收藏',
                            'Change Category': '移动到',
                            'Confirm': '确定',
                            'You are currently at ': '当前：',
                            ' towards a limit of ': '，限制为 ',
                            '. This regenerates at a rate of ': '，每分钟回复 ',
                            ' per minute.': ' 点',
                            'Reset Cost: ': '重置限制花费：',
                            'Reset Limit': '重置限制',
                            'Reset Torrent Key': '重置种子 KEY',
                            'Latest Site Status Updates': '最新网站状态',
                            'Site Update Log': '网站更新日志',

                            'Multi-Page Viewer': '多页查看器',
                            'Always use the Multi-Page Viewer? There will still be a link to manually start it if this is left disabled.':
                                '总是使用多页查看器？如果禁用此选项，仍可以手动启动多页查看器。',
                            ' Nope': ' 否',
                            ' Yup': ' 是',
                            'Multi-Page Viewer Display Style:': '显示样式：',
                            ' Align left; Only scale if image is larger than browser width': '左对齐；仅当图像大于浏览器宽度时缩放',
                            ' Align center; Only scale if image is larger than browser width': '居中对齐；仅当图像大于浏览器宽度时缩放',
                            ' Align center; Always scale images to fit browser width': '居中对齐；始终缩放图像以适应浏览器宽度',
                            'Multi-Page Viewer Thumbnail Pane:': '显示缩略图侧栏：',
                            ' Show': ' 显示',
                            ' Hide': ' 隐藏',
                            'Apply': '应用',

                            ' Minimal': ' 最小化',
                            ' Minimal+': ' 最小化 + 关注标签',
                            ' Compact': ' 紧凑 + 标签',
                            ' Extended': ' 扩展',
                            ' Thumbnail': ' 缩略图',

                            'Rename': '重命名',
                            'Create New': '新建',
                            'Description': '描述',

                            'You have encountered a monster!': '你遇到了怪物！',
                            'Click here to fight in the HentaiVerse.': '点击这里进入 HentaiVerse 战斗',

                            'If you want to combine a file search with a category/keyword search, upload the file first.':
                                '如果要将文件和类别、关键词结合搜索，请先上传文件。',
                            'Select a file to upload, then hit File Search. All public galleries containing this exact file will be displayed.':
                                '选择要搜索的图片文件,点击“文件搜索”。将显示包含此文件的所有公开图库。',
                            'For color images, the system can also perform a similarity lookup to find resampled images.':
                                '对于彩色图片，系统还可以执行相似性查询以找到重采样过的图片。',
                            'Use Similarity Scan': '使用相似性查询',
                            'Only Search Covers': '仅搜索封面',
                            'Show Expunged': '显示被删除的图库',
                            'File Search': '文件搜索',

                            'There are newer versions of this gallery available:': '此库有更新的版本可用：',
                            'Next Page >': '下一页 >',

                            'Show all galleries with this file': '显示所有包含此图片的图库',
                            'Generate a static forum image link': '生成用于论坛的图片链接',
                            'Click here if the image fails loading': '重新加载图片',
                        },
                    },
                    {
                        matches: ['#rating_label'],
                        replaces:[ //             text = text.replace(/Average: ([\d\.]+)/, '平均值：$1');
                            {
                                pattern: 'Average: ([\\d\\.]+)',
                                replace: '平均值：$1',
                            }
                        ]
                    },
                    {
                        matches: ['#gright > #gd5 > p > a'],
                        replaces:[ //             text = text.replace(/Average: ([\d\.]+)/, '平均值：$1');
                            {
                                pattern: 'Torrent Download \\( (\\d+) \\)',
                                replace: '种子下载（$1）',
                            }
                        ]
                    }
                    /*                    {
                                            "nodeName": ["#TEXT"], // 遍历节点匹配nodename
                                            "dictionary": "JSONATA:data.tags{namespace & ':' & key: name}", // http://try.jsonata.org/BkFU1x6k8
                                            "read": "textContent", // 从什么地方读取 attr:title textContent innerHTML innerText
                                            "write": "textContent", // 写入什么地方 attr:title textContent innerHTML innerText
                                            "replaces": [ // 正则替换
                                                {
                                                    "pattern": "([0-9.]+) star",
                                                    "flags": "i",
                                                    "replace": "$1 星"
                                                }
                                            ]
                                        },
                                        {
                                            "matches": [ // 指定匹配的节点
                                                "#list>li .title",
                                                "#list2>li .title"
                                            ],
                                            "replaces": [ // 正则替换
                                                {
                                                    "pattern": "([0-9.]+) star",
                                                    "flags": "i",
                                                    "replace": "$1 星"
                                                }
                                            ],
                                            "cloneNode": true // 复制一个新的节点，来存储翻译，旧节点display:none隐藏掉，用于兼容其他插件
                                        }*/
                ]
            }
        },
        {
            "performer": "InputHint",  // 输入提示模块
            "parameter": {
                "matches": [ // 指定输入框
                    "input#search"
                ],
                "dataset": "JSONATA:data.tags.{'label': name,'value': namespace & ':' & key}", // http://try.jsonata.org/SJD-ye6y8
            }
        },
    ]
};



(async () => {

    const runnerUrl = chrome.runtime.getURL('script/main.js');
    const r = await fetch(runnerUrl);
    const runnerScript = await r.text();

    function jsonataAnalysis(value: any, fullData: any) {
        if(typeof value === 'object') {
            for(let key in value) {
                if(!value.hasOwnProperty(key)) continue;
                const v = value[key];
                if(typeof v === "string" && v.slice(0, 8) === 'JSONATA:') {
                    const jsonataScript = v.slice(8);
                    value[key] = jsonata(jsonataScript).evaluate(fullData);
                }else if(typeof v === "object") {
                    jsonataAnalysis(v, fullData);
                }
            }
        }
    }
    jsonataAnalysis(script, script);

    const executeScripts: {match: string[], key: string, data: string}[] = [];
    executeScripts.push({
        match: script.match,
        data: JSON.stringify(script),
        key: script.key,
    });

    browser.tabs.onUpdated.addListener(async (tabId: number, changeInfo, tab) => {
        if (changeInfo['status'] != 'loading') return;
        let dataScript = '';
        for(const scriptPack of executeScripts) {
            if (scriptPack.match.find(rule => matchUrl(tab.url, rule))) {
                const data = scriptPack.data;
                const code = `if(!window.syringe) window.syringe = {};\nwindow.syringe["${scriptPack.key}"] = ${data};\n`;
                dataScript += code;
            }
        }
        if(dataScript) {
            await browser.tabs.executeScript(tabId, {
                code: `
                    const script = document.createElement('script');
                    script.innerHTML = \`${dataScript.replace(/\\/igm, "\\\\")}\`;
                    const runnerScript = document.createElement('script');
                    runnerScript.innerHTML = \`${runnerScript.replace(/\\/igm, "\\\\")}\`
                    document.head.appendChild(script);
                    document.head.appendChild(runnerScript);
                `,
                runAt: "document_start",
            });
        }
    });
})();


