const haberturkRss: { [key: string]: string } = {
  haberturk_ekonomi: "https://www.haberturk.com/rss/ekonomi.xml",
  tum_haberler: "https://www.haberturk.com/rss/manset.xml",
  ekonomi: "https://www.haberturk.com/rss/ekonomi.xml",
  spor: "https://www.haberturk.com/rss/spor.xml",
  magazin: "https://www.haberturk.com/rss/magazin.xml",
  medya: "https://www.haberturk.com/rss/kategori/medya.xml",
  kadin: "https://www.haberturk.com/rss/kategori/kadin.xml",
  siyaset: "https://www.haberturk.com/rss/kategori/siyaset.xml",
  tatil: "https://www.haberturk.com/rss/kategori/tatil.xml",
  is_yasam: "https://www.haberturk.com/rss/kategori/is-yasam.xml",
  astroloji: "https://www.haberturk.com/rss/kategori/astroloji.xml",
  saglik: "https://www.haberturk.com/rss/kategori/saglik.xml",
  dunya: "https://www.haberturk.com/rss/kategori/dunya.xml",
  yasam: "https://www.haberturk.com/rss/kategori/yasam.xml",
  gida: "https://www.haberturk.com/rss/kategori/gida.xml",
  gundem: "https://www.haberturk.com/rss/kategori/gundem.xml",
  kultur_sanat: "https://www.haberturk.com/rss/kategori/kultur-sanat.xml",
  sinema: "https://www.haberturk.com/rss/kategori/sinema.xml",
  teknoloji: "https://www.haberturk.com/rss/kategori/teknoloji.xml",
  otomobil: "https://www.haberturk.com/rss/kategori/otomobil.xml",
  kitap: "https://www.haberturk.com/rss/kategori/kitap.xml",
  video: "https://www.haberturk.com/rss/kategori/video.xml",
  yazarlar: "https://www.haberturk.com/rss/kategori/yazarlar.xml",
  yerel_haberler: "https://www.haberturk.com/rss/yerel-haberler.xml",
};

const sozcuRss: { [key: string]: string } = {
  voleybol: "https://www.sozcu.com.tr/feeds-rss-category-voleybol",
  kripto: "https://www.sozcu.com.tr/feeds-rss-category-kripto",
  emlak: "https://www.sozcu.com.tr/feeds-rss-category-emlak",
  emtia: "https://www.sozcu.com.tr/feeds-rss-category-emtia",
  borsa: "https://www.sozcu.com.tr/feeds-rss-category-borsa",
  kesfet: "https://www.sozcu.com.tr/feeds-rss-category-kesfet",
  ilan: "https://www.sozcu.com.tr/feeds-rss-category-ilan",
  dunyadan_futbol: "https://www.sozcu.com.tr/feeds-rss-category-dunyadan-spor",
  hayat: "https://www.sozcu.com.tr/feeds-rss-category-hayat",
  sozcu: "https://www.sozcu.com.tr/feeds-rss-category-sozcu",
  diger_sporlar: "https://www.sozcu.com.tr/feeds-rss-category-diger-sporlar",
  basketbol: "https://www.sozcu.com.tr/feeds-rss-category-basketbol",
  futbol: "https://www.sozcu.com.tr/feeds-rss-category-futbol",
  kultur_sanat: "https://www.sozcu.com.tr/feeds-rss-category-kultur-sanat",
  gunun_icinden: "https://www.sozcu.com.tr/feeds-rss-category-gunun-icinden",
  otomotiv: "https://www.sozcu.com.tr/feeds-rss-category-otomotiv",
  egitim: "https://www.sozcu.com.tr/feeds-rss-category-egitim",
  astroloji: "https://www.sozcu.com.tr/feeds-rss-category-astroloji",
  bilim_teknoloji:
    "https://www.sozcu.com.tr/feeds-rss-category-bilim-teknoloji",
  sigorta: "https://www.sozcu.com.tr/feeds-rss-category-sigorta",
  finans: "https://www.sozcu.com.tr/feeds-rss-category-finans",
  ekonomi: "https://www.sozcu.com.tr/feeds-rss-category-ekonomi",
  yazarlar: "https://www.sozcu.com.tr/feeds-rss-category-yazar",
  yasam: "https://www.sozcu.com.tr/feeds-rss-category-yasam",
  spor: "https://www.sozcu.com.tr/feeds-rss-category-spor",
  saglik: "https://www.sozcu.com.tr/feeds-rss-category-saglik",
  magazin: "https://www.sozcu.com.tr/feeds-rss-category-magazin",
  dunya: "https://www.sozcu.com.tr/feeds-rss-category-dunya",
  gundem: "https://www.sozcu.com.tr/feeds-rss-category-gundem",
  son_dakika: "https://www.sozcu.com.tr/feeds-son-dakika",
  haberler: "https://www.sozcu.com.tr/feeds-haberler",
};

const cnnTurkRss: { [key: string]: string } = {
  son_dakika: "https://www.cnnturk.com/feed/rss/all/news",
  turkiye: "https://www.cnnturk.com/feed/rss/turkiye/news",
  dunya: "https://www.cnnturk.com/feed/rss/dunya/news",
  kultur_sanat: "https://www.cnnturk.com/feed/rss/kultur-sanat/news",
  bilim_teknoloji: "https://www.cnnturk.com/feed/rss/bilim-teknoloji/news",
  yasam: "https://www.cnnturk.com/feed/rss/yasam/news",
  spor: "https://www.cnnturk.com/feed/rss/spor/news",
  ekonomi: "https://www.cnnturk.com/feed/rss/ekonomi/news",
  magazin: "https://www.cnnturk.com/feed/rss/magazin/news",
  saglik: "https://www.cnnturk.com/feed/rss/saglik/news",
  yazar: "https://www.cnnturk.com/feed/rss/yazarlar",
  seyahat: "https://www.cnnturk.com/feed/rss/seyahat/news",
};

const aaRss: { [key: string]: string } = {
  son_dakika: "https://www.aa.com.tr/tr/rss/default?cat=guncel",
  dunya: "https://www.aa.com.tr/tr/rss/default?cat=dunya",
  ekonomi: "https://www.aa.com.tr/tr/rss/default?cat=ekonomi",
  spor: "https://www.aa.com.tr/tr/rss/default?cat=spor",
  saglik: "https://www.aa.com.tr/tr/rss/default?cat=saglik",
  egitim: "https://www.aa.com.tr/tr/rss/default?cat=egitim",
  yasam: "https://www.aa.com.tr/tr/rss/default?cat=yasam",
  politika: "https://www.aa.com.tr/tr/rss/default?cat=politika",
  kultur_sanat: "https://www.aa.com.tr/tr/teyithatti/rss/news?cat=kultur-sanat",
  bilim_teknoloji:
    "https://www.aa.com.tr/tr/teyithatti/rss/news?cat=bilim-teknoloji",
};

const ntvRss: { [key: string]: string } = {
  son_dakika: "https://www.ntv.com.tr/son-dakika.rss",
  dunya: "https://www.ntv.com.tr/dunya.rss",
  turkiye: "https://www.ntv.com.tr/turkiye.rss",
  ekonomi: "https://www.ntv.com.tr/ekonomi.rss",
  ntv_para: "https://www.ntv.com.tr/ntvpara.rss",
  spor: "https://www.ntv.com.tr/spor.rss",
  yasam: "https://www.ntv.com.tr/yasam.rss",
  magazin: "https://www.ntv.com.tr/magazin.rss",
  teknoloji: "https://www.ntv.com.tr/teknoloji.rss",
  saglik: "https://www.ntv.com.tr/saglik.rss",
  egitim: "https://www.ntv.com.tr/egitim.rss",
  otomobil: "https://www.ntv.com.tr/otomobil.rss",
};

export const rssFeeds: { [key: string]: { [key: string]: string } } = {
  haberturk: haberturkRss,
  sozcu: sozcuRss,
  cnnturk: cnnTurkRss,
  anadolu_ajansi: aaRss,
  ntv: ntvRss,
};

export function getRSSFeedUrl(
  source: string,
  category: string
): string | undefined {
  return rssFeeds[source]?.[category];
}
