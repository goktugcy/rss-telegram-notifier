const haberturkRss: { [key: string]: string } = {
  gundem: "https://www.haberturk.com/rss/kategori/gundem.xml",
  haberturk_ekonomi: "https://www.haberturk.com/rss/ekonomi.xml",
  // tum_haberler: "https://www.haberturk.com/rss/manset.xml",
  // ekonomi: "https://www.haberturk.com/rss/ekonomi.xml",
  // spor: "https://www.haberturk.com/rss/spor.xml",
  // magazin: "https://www.haberturk.com/rss/magazin.xml",
  // medya: "https://www.haberturk.com/rss/kategori/medya.xml",
  // kadin: "https://www.haberturk.com/rss/kategori/kadin.xml",
  // siyaset: "https://www.haberturk.com/rss/kategori/siyaset.xml",
  // tatil: "https://www.haberturk.com/rss/kategori/tatil.xml",
  // is_yasam: "https://www.haberturk.com/rss/kategori/is-yasam.xml",
  // astroloji: "https://www.haberturk.com/rss/kategori/astroloji.xml",
  // saglik: "https://www.haberturk.com/rss/kategori/saglik.xml",
  // dunya: "https://www.haberturk.com/rss/kategori/dunya.xml",
  // yasam: "https://www.haberturk.com/rss/kategori/yasam.xml",
  // gida: "https://www.haberturk.com/rss/kategori/gida.xml",
  // kultur_sanat: "https://www.haberturk.com/rss/kategori/kultur-sanat.xml",
  // sinema: "https://www.haberturk.com/rss/kategori/sinema.xml",
  // teknoloji: "https://www.haberturk.com/rss/kategori/teknoloji.xml",
  // otomobil: "https://www.haberturk.com/rss/kategori/otomobil.xml",
  // kitap: "https://www.haberturk.com/rss/kategori/kitap.xml",
  // video: "https://www.haberturk.com/rss/kategori/video.xml",
  // yazarlar: "https://www.haberturk.com/rss/kategori/yazarlar.xml",
  // yerel_haberler: "https://www.haberturk.com/rss/yerel-haberler.xml",
};

const cnnTurkRss: { [key: string]: string } = {
  son_dakika: "https://www.cnnturk.com/feed/rss/all/news",
  turkiye: "https://www.cnnturk.com/feed/rss/turkiye/news",
  // dunya: "https://www.cnnturk.com/feed/rss/dunya/news",
  // kultur_sanat: "https://www.cnnturk.com/feed/rss/kultur-sanat/news",
  // bilim_teknoloji: "https://www.cnnturk.com/feed/rss/bilim-teknoloji/news",
  // yasam: "https://www.cnnturk.com/feed/rss/yasam/news",
  // spor: "https://www.cnnturk.com/feed/rss/spor/news",
  // ekonomi: "https://www.cnnturk.com/feed/rss/ekonomi/news",
  // magazin: "https://www.cnnturk.com/feed/rss/magazin/news",
  saglik: "https://www.cnnturk.com/feed/rss/saglik/news",
  // yazar: "https://www.cnnturk.com/feed/rss/yazarlar",
  // seyahat: "https://www.cnnturk.com/feed/rss/seyahat/news",
};

const t24Rss: { [key: string]: string } = {
  gundem: "https://t24.com.tr/rss/haber/gundem",
  bilim_teknoloji: "https://t24.com.tr/rss/haber/bilim-teknoloji",
};

export const rssFeeds: { [key: string]: { [key: string]: string } } = {
  haberturk: haberturkRss,
  cnnturk: cnnTurkRss,
  t24: t24Rss,
};

export function getRSSFeedUrl(
  source: string,
  category: string
): string | undefined {
  return rssFeeds[source]?.[category];
}
