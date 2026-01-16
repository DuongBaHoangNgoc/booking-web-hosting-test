import Header from "@/components/layout/Header";

export default function TraCuu() {
  return (
    <div className="relative min-h-screen text-slate-800">
      <Header />
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/backgrounds/KYTbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2">Chọn ghế</h1>

          {/* Description */}
          <p className="text-center text-sm text-slate-500 mb-6 leading-relaxed">
            Dành cho đơn đã đặt vé qua form và đã gửi minh chứng thanh toán.
            Nhập số điện thoại hoặc email để tra cứu thông tin đặt vé của bạn.
          </p>

          {/* Input */}
          <input
            type="text"
            placeholder="Số điện thoại hoặc email"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 mb-4"
          />

          {/* Button */}
          <button className="w-full bg-cyan-500 hover:bg-cyan-400 transition text-white font-semibold py-3 rounded-lg">
            Tra cứu
          </button>
        </div>
      </div>
    </div>
  );
}
