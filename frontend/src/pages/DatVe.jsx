import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, Ticket } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import Header from "@/components/layout/Header";

const MAX_SEATS = 10;
const PRICE = 50000;

export default function DatVe() {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const [hasReferral, setHasReferral] = useState(""); // "yes" | "no"
  const [users, setUsers] = useState([]);
  const [referrerId, setReferrerId] = useState("");

  /* ---------------- FETCH SEATS ---------------- */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/seats`)
      .then((res) => res.json())
      .then((data) => setSeats(data))
      .catch(() => setSeats([]));
  }, []);

  /* ---------------- FETCH USERS (WHEN NEEDED) ---------------- */
  useEffect(() => {
    if (hasReferral === "yes") {
      fetch(`${import.meta.env.VITE_API_URL}/api/users`)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch(() => setUsers([]));
    }
  }, [hasReferral]);

  /* ---------------- TOGGLE SEAT ---------------- */
  const toggleSeat = (seat) => {
    if (seat.status === "SOLD") return;

    if (selectedSeats.includes(seat.seatCode)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.seatCode));
    } else {
      if (selectedSeats.length >= MAX_SEATS) return;
      setSelectedSeats([...selectedSeats, seat.seatCode]);
    }
  };

  const totalPrice = selectedSeats.length * PRICE;

  return (
    <div className="relative min-h-screen text-white">
      <Header />

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/backgrounds/KYTbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

      <div className="relative z-10 container mx-auto px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* ================= SEAT MAP ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Sơ đồ ghế – “Khúc Yêu Thương 2026”
            </h2>

            <div className="bg-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-center mb-6">
                <div className="bg-white text-slate-800 font-bold px-20 py-4 rounded-xl shadow">
                  STAGE
                </div>
              </div>

              <div className="grid grid-cols-[repeat(14,1fr)] gap-1 justify-center">
                {seats.map((seat) => {
                  const isSelected = selectedSeats.includes(seat.seatCode);
                  const isSold = seat.status === "SOLD";

                  return (
                    <motion.div
                      key={seat.seatCode}
                      whileHover={!isSold ? { scale: 1.15 } : undefined}
                      whileTap={!isSold ? { scale: 0.9 } : undefined}
                      animate={{ scale: isSelected ? 1.2 : 1 }}
                      style={{
                        backgroundColor: isSold
                          ? "#475569"
                          : isSelected
                          ? "#22d3ee"
                          : "#22c55e",
                      }}
                      onClick={() => toggleSeat(seat)}
                      className={`
                        w-7 h-7 rounded text-[9px] font-semibold
                        flex items-center justify-center
                        text-slate-900
                        ${
                          isSold
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer"
                        }
                      `}
                    >
                      {seat.seatCode}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center gap-6 mt-4 text-sm">
              <Legend color="bg-green-500" label="Còn trống" />
              <Legend color="bg-cyan-400" label="Đang chọn" />
              <Legend color="bg-slate-600" label="Đã bán" />
            </div>
          </motion.div>

          {/* ================= FORM ================= */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold mb-4">
                Đêm nhạc “Khúc Yêu Thương 2026”
              </h3>
              <p>🕖 17h30 – 22h00 | 17/01/2026</p>
              <p>📍 Nhà thi đấu – ĐH Đà Nẵng</p>
              <p>🎫 50.000 VNĐ / vé</p>
            </div>

            <div className="bg-gradient-to-b from-white/20 to-white/5 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-center mb-6">
                Thông tin đặt vé
              </h3>

              <FormRow icon={<User />} label="Họ và tên*" />
              <FormRow icon={<Phone />} label="Số điện thoại*" />
              <FormRow icon={<Mail />} label="Email*" />
              <FormRow icon={<MapPin />} label="Địa chỉ nhận*" note />
              <FormRow icon={<FaFacebook />} label="Link Facebook*" />

              {/* Referral select */}
              <div className="mb-4">
                <div className="flex items-center gap-3">
                  <User />
                  <label className="w-32 text-sm">
                    Bạn có được bạn bè giới thiệu?*
                  </label>
                  <select
                    value={hasReferral}
                    onChange={(e) => {
                      setHasReferral(e.target.value);
                      setReferrerId("");
                    }}
                    className="flex-1 rounded-xl px-4 py-3 text-slate-800"
                  >
                    <option value="">-- Chọn --</option>
                    <option value="no">Không</option>
                    <option value="yes">Có</option>
                  </select>
                </div>
              </div>

              {/* Referrer select (conditional) */}
              {hasReferral === "yes" && (
                <div className="mb-4">
                  <div className="flex items-center gap-3">
                    <User />
                    <label className="w-32 text-sm">Bạn bè giới thiệu*</label>
                    <select
                      value={referrerId}
                      onChange={(e) => setReferrerId(e.target.value)}
                      className="flex-1 rounded-xl px-4 py-3 text-slate-800"
                    >
                      <option value="">-- Chọn bạn --</option>
                      {users.map((u) => (
                        <option key={u.userID} value={u.userID}>
                          {u.userName} ({u.team})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <FormRow
                icon={<Ticket />}
                label="Vị trí đã chọn"
                value={selectedSeats.join(", ")}
                disabled
                placeholder="Chọn ghế trực tiếp trên sơ đồ"
              />

              <button
                disabled={selectedSeats.length === 0}
                onClick={() => setShowConfirm(true)}
                className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 rounded-2xl py-4 font-bold text-lg"
              >
                Thanh toán ({totalPrice.toLocaleString()} VNĐ)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONFIRM ================= */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-slate-900 rounded-2xl p-8 w-[400px]"
            >
              <h3 className="text-lg font-bold mb-4">Xác nhận thanh toán</h3>
              <p>Ghế: {selectedSeats.join(", ")}</p>
              <p className="mt-2 font-semibold">
                Tổng tiền: {totalPrice.toLocaleString()} VNĐ
              </p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-slate-600 rounded-xl py-2"
                >
                  Hủy
                </button>
                <button className="flex-1 bg-cyan-500 rounded-xl py-2 font-bold">
                  Xác nhận
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */
function FormRow({ icon, label, value, disabled, placeholder, note }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <div>{icon}</div>
        <label className="w-32 text-sm">{label}</label>
        <input
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 rounded-xl px-4 py-3 text-slate-800"
        />
      </div>

      {note && (
        <p className="text-xs italic text-slate-300 ml-[56px] mt-1">
          * Vé sẽ được gửi bản cứng và online qua email
        </p>
      )}
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 rounded ${color}`} />
      {label}
    </div>
  );
}
