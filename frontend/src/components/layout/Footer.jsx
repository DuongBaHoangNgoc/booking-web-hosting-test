import { Facebook, Mail, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export function Footer() {
  return (
    <footer id="contact" className="w-full bg-[#2f5794] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* ========== LOGO ========== */}
          <div>
            <img
              src="/logos/logo-clb.jpg"
              alt="CLB Guitar DUE"
              className="w-40"
            />
          </div>

          {/* ========== CLB INFO ========== */}
          <div>
            <h3 className="font-bold text-lg mb-3 border-b border-white/40 pb-2">
              CLB GUITAR DUE
            </h3>

            <p className="font-semibold mb-3">Đơn vị chủ quản</p>

            <div className="flex gap-4 mb-6">
              <img src="/logos/logo-dtn.png" className="h-14" />
              <img src="/logos/logo-DUE.png" className="h-14" />
              <img src="/logos/Logo-Hoi-Sinh-Vien.jpg" className="h-14" />
            </div>

            <p className="font-semibold mb-3">Thông tin truyền thông</p>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Facebook className="w-5 h-5" />
                <a
                  href="https://www.facebook.com/guitarDUE"
                  className="underline hover:text-white/80"
                >
                  https://www.facebook.com/guitarDUE
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>clbguitarDUE@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaTiktok className="w-5 h-5" />
                <span>CLB Guitar DUE</span>
              </div>
            </div>
          </div>

          {/* ========== PROJECT & PARTNERS ========== */}
          <div>
            <h3 className="font-bold text-lg mb-3 border-b border-white/40 pb-2">
              Khúc Yêu Thương 2026
            </h3>

            <p className="font-semibold mb-4">Đơn vị đồng hành</p>

            <div className="flex gap-6">
              <img src="/logos/logo-swing.jpg" className="h-16 rounded-lg" />
              <img src="/logos/logo-fm.jpg" className="h-16 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
