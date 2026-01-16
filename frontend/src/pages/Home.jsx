import ImageCarousel from "@/components/ImageCarousel";
import { Footer } from "../components/layout/Footer";
import Header from "@/components/layout/Header";

export default function Home() {
  const galleryImages = [
    "/images/kk1.jpg",
    "/images/kk2.jpg",
    "/images/kk3.jpg",
    "/images/kk4.jpg",
  ];

  const swingImages = [
    "/images/swing1.jpg",
    "/images/swing2.jpg",
    "/images/swing3.jpg",
    "/images/swing4.jpg",
  ];

  return (
    <div className="font-sans text-slate-800 bg-slate-50">
      <Header />
      {/* ================= HERO SECTION (Bright Overlay) ================= */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-1"
          style={{ backgroundImage: "url('/backgrounds/KYTbackground.jpg')" }}
        ></div>
      </section>

      {/* ================= KYT section ================= */}
      <section id="kyt" className="relative w-full">
        {/* nền tối + hiệu ứng chuyển */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />

        <div className="relative w-full px-4 md:px-10 lg:px-14 py-14">
          {/* Title */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Về Khúc Yêu Thương
            </h2>
            <p className="text-slate-300 mt-2">
              Những khoảnh khắc đáng nhớ của chương trình
            </p>
          </div>

          {/* Layout: card trái + carousel phải */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CARD THÔNG TIN (giống ảnh mẫu) */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
                {/* header nhỏ */}
                <div className="px-6 py-5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-b border-white/10">
                  <p className="text-white/90 font-semibold">Khúc yêu thương</p>
                  <p className="text-white/60 text-sm mt-1">
                    Chương trình thiện nguyện & đêm nhạc gây quỹ
                  </p>
                </div>

                {/* body */}
                <div className="px-6 py-5 text-slate-100">
                  <p className="leading-relaxed text-[15px] text-slate-100/90">
                    "Khúc Yêu Thương 2025" là chương trình tình nguyện thường
                    niên và đặc sắc nhất của CLB Guitar DUE. Không chỉ mang lại
                    không khí sôi động của một đêm nhạc hoành tráng, chương
                    trình còn lan tỏa hạnh phúc, chia sẻ yêu thương đến các em ở
                    vùng cao, vùng xa.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                      <p className="text-white/60">Thời gian</p>
                      <p className="font-semibold text-white">
                        19:00 • 11/05/2025
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/10 border border-white/10 p-3">
                      <p className="text-white/60">Địa điểm</p>
                      <p className="font-semibold text-white">
                        Trường ĐH Kinh Tế, ĐH Đà Nẵng
                      </p>
                    </div>
                  </div>

                  <button className="mt-6 w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 transition text-white font-semibold py-3">
                    Xem chi tiết chương trình
                  </button>
                </div>
              </div>
            </div>

            {/* CAROUSEL TRÀN VIỀN */}
            <div className="lg:col-span-8">
              {/* Khung tràn viền: bỏ container, full width trong section */}
              <div className="w-full">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <ImageCarousel
                    images={galleryImages}
                    height="h-[340px] md:h-[480px]"
                    interval={3500}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CLB GUITAR DUE ================= */}
      <section
        id="clb"
        className="relative min-h-[90vh] flex justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/kk4.jpg')" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900/90" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 pt-24 md:pt-32">
          {/* Title */}
          <h1 className="text-white font-extrabold text-3xl md:text-5xl lg:text-6xl tracking-wide drop-shadow-lg">
            CLB GUITAR DUE
          </h1>

          {/* Slogan */}
          <p className="mt-4 text-slate-200 text-base md:text-lg italic drop-shadow">
            “Guitar – Kết nối đam mê”
          </p>

          {/* Description Card */}
          <div className="mt-10 max-w-4xl rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl px-6 md:px-10 py-6 md:py-8">
            <p className="text-slate-100/90 text-sm md:text-base leading-relaxed">
              Câu lạc bộ Guitar Đại học Kinh tế – Đại học Đà Nẵng (Guitar DUE)
              là tổ chức sinh viên trực thuộc Đoàn TNCS Hồ Chí Minh Trường Đại
              học Kinh tế – Đại học Đà Nẵng, được thành lập vào ngày 20 tháng 11
              năm 2006. Với sứ mệnh kết nối và phát triển đam mê âm nhạc, Guitar
              DUE đã trở thành mái nhà chung cho những sinh viên yêu thích
              guitar và âm nhạc. Qua hơn một thập kỷ hoạt động, câu lạc bộ không
              chỉ tổ chức các buổi biểu diễn, workshop, chương trình giao lưu âm
              nhạc mà còn góp phần tạo nên những khoảnh khắc đáng nhớ cho cộng
              đồng sinh viên.
            </p>
          </div>
        </div>
      </section>

      {/* ================= Swing band ================= */}
      <section id="swing" className="relative w-full">
        {/* nền tối + hiệu ứng chuyển */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />

        <div className="relative w-full px-4 md:px-10 lg:px-14 py-14">
          {/* Title */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Swing Band
            </h2>
            <p className="text-slate-300 mt-2">Linh hồn của Khúc Yêu Thương</p>
          </div>

          {/* Layout: card trái + carousel phải */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* CARD THÔNG TIN (giống ảnh mẫu) */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden">
                {/* header nhỏ */}
                <div className="px-6 py-5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-b border-white/10">
                  <p className="text-white/90 font-semibold">Swing Band</p>
                  <p className="text-white/60 text-sm mt-1">
                    Band nhạc Vip pro số 1 Đà Nẵng
                  </p>
                </div>

                {/* body */}
                <div className="px-6 py-5 text-slate-100">
                  <p className="leading-relaxed text-[15px] text-slate-100/90">
                    Trong thế giới âm nhạc rộn ràng và đầy sắc màu, Swing luôn
                    mang đến một nhịp điệu rất riêng – vừa hoài niệm, vừa phóng
                    khoáng, vừa khiến người nghe không thể đứng yên. Đến với
                    chương trình hôm nay, chúng ta hãy cùng chào đón [Tên Band]
                    – một ban nhạc theo đuổi dòng nhạc Swing với tinh thần trẻ
                    trung, sáng tạo nhưng vẫn giữ trọn cái “chất” cổ điển đầy
                    cuốn hút. Những giai điệu jazz swing, blues hay retro quen
                    thuộc sẽ được band thổi vào một làn gió mới, đưa khán giả
                    quay về không khí sôi động, lãng mạn của những thập niên
                    vàng son. Âm nhạc của [Tên Band] không chỉ để lắng nghe, mà
                    còn để cảm nhận, để nhún nhảy theo từng nhịp trống, từng
                    tiếng guitar và những giai điệu đầy ngẫu hứng. Ngay bây giờ,
                    xin mời tất cả chúng ta hãy dành một tràng pháo tay thật
                    nồng nhiệt để chào đón [Tên Band] – và cùng bước vào không
                    gian Swing đầy mê hoặc!
                  </p>
                </div>
              </div>
            </div>

            {/* CAROUSEL TRÀN VIỀN */}
            <div className="lg:col-span-8">
              {/* Khung tràn viền: bỏ container, full width trong section */}
              <div className="w-full">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <ImageCarousel images={swingImages} interval={3500} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
