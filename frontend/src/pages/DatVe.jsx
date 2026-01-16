import Header from "@/components/layout/Header";

export default function DatVe() {
  return (
    <div className="relative min-h-screen text-white">
      <Header />
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/backgrounds/KYTbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ================= LEFT – SEAT MAP ================= */}
          <div className="lg:col-span-7">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Sơ đồ ghế ngồi đêm nhạc “Khúc Yêu Thương 2026”
            </h2>

            <div className="bg-white/10 rounded-2xl p-6 shadow-xl">
              {/* Stage */}
              <div className="flex justify-center mb-6">
                <div className="bg-white text-slate-800 font-bold px-12 py-6 rounded-lg">
                  STAGE
                </div>
              </div>

              {/* Seat grid (demo) */}
              <div className="grid grid-cols-[repeat(14,1fr)] gap-1 justify-center">
                {Array.from({ length: 14 * 14 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-sm bg-green-500 hover:bg-cyan-400 cursor-pointer"
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="flex gap-6 mt-6 text-sm justify-center">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-gray-300 block rounded" />
                  Đã đặt
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 block rounded" />
                  Có thể chọn
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-cyan-400 block rounded" />
                  Đang chọn
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT – INFO + FORM ================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Event info */}
            <div className="bg-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-4">
                Đêm nhạc gây quỹ
                <br />
                “Khúc Yêu Thương 2026”
              </h3>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>🕖 17h30 – 22h00 | 17/01/2026</li>
                <li>📍 Nhà thi đấu – ĐH Đà Nẵng</li>
                <li>🎫 50.000 VNĐ / vé</li>
              </ul>
            </div>

            {/* Booking form */}
            <div className="bg-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-4">Thông tin đặt vé</h3>

              <div className="space-y-4 text-sm">
                <input className="input" placeholder="Họ và tên" />
                <input className="input" placeholder="Số điện thoại" />
                <input className="input" placeholder="Email" />
                <input className="input" placeholder="Địa chỉ nhận vé" />
                <input
                  className="input bg-slate-700"
                  placeholder="Vị trí đã chọn"
                  disabled
                />
              </div>

              <button className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 transition rounded-xl py-3 font-semibold">
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
