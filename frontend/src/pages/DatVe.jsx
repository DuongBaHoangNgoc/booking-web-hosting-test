import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, MapPin, Ticket } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import Header from "@/components/layout/Header";

const ROWS = 26; // A - Z
const COLS = 30; // 1 - 30
const MAX_SEATS = 10;
const PRICE = 50000;

export default function DatVe() {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const [hasReferral, setHasReferral] = useState("");
  const [users, setUsers] = useState([]);
  const [referrerId, setReferrerId] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    facebook: "",
  });

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* ---------------- FETCH SEATS ---------------- */
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/seats`)
      .then((res) => res.json())
      .then((data) => setSeats(data))
      .catch(() => setSeats([]));
  }, []);

  /* ---------------- FETCH USERS ---------------- */
  useEffect(() => {
    if (hasReferral === "yes") {
      fetch(`${import.meta.env.VITE_API_URL}/api/users`)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch(() => setUsers([]));
    }
  }, [hasReferral]);

  /* ---------------- SEAT MAP (A1 → Z30) ---------------- */
  const seatStatusMap = useMemo(() => {
    const map = {};
    seats.forEach((s) => {
      map[s.seatCode] = s.status;
    });
    return map;
  }, [seats]);

  const seatMatrix = useMemo(() => {
    const rows = [];
    for (let r = 0; r < ROWS; r++) {
      const rowChar = String.fromCharCode(65 + r);
      const cols = [];
      for (let c = 1; c <= COLS; c++) {
        const seatCode = `${rowChar}${c}`;
        cols.push({
          seatCode,
          status: seatStatusMap[seatCode] || "AVAILABLE",
        });
      }
      rows.push(cols);
    }
    return rows;
  }, [seatStatusMap]);

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

  const isFormValid =
    form.fullName &&
    form.phone &&
    form.email &&
    form.address &&
    form.facebook &&
    selectedSeats.length > 0 &&
    (hasReferral === "no" || (hasReferral === "yes" && referrerId));

  return (
    <div className="relative min-h-screen text-white pb-24 md:pb-0">
      <Header />

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/backgrounds/KYTbackground.jpg')" }}
      />
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 md:py-28">
        {/* Event Info Card - nổi bật trên mobile */}
        <div className="bg-white/10 rounded-2xl p-5 md:p-6 shadow-xl mb-6 md:mb-10 text-center md:text-left">
          <h3 className="text-lg md:text-xl font-bold mb-3">
            Đêm nhạc “Khúc Yêu Thương 2026”
          </h3>
          <p className="text-sm md:text-base">🕖 17h30 – 22h00 | 17/01/2026</p>
          <p className="text-sm md:text-base">📍 Nhà thi đấu – ĐH Đà Nẵng</p>
          <p className="text-sm md:text-base font-semibold mt-1">
            🎫 50.000 VNĐ / vé
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-10">
          {/* FORM – đưa lên đầu trên mobile */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <div className="bg-gradient-to-b from-white/20 to-white/5 rounded-3xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-center mb-6">
                Thông tin đặt vé
              </h3>

              <FormRow
                icon={<User />}
                label="Họ và tên*"
                value={form.fullName}
                onChange={(v) => updateForm("fullName", v)}
              />
              <FormRow
                icon={<Phone />}
                label="Số điện thoại*"
                value={form.phone}
                onChange={(v) => updateForm("phone", v)}
              />
              <FormRow
                icon={<Mail />}
                label="Email*"
                value={form.email}
                onChange={(v) => updateForm("email", v)}
              />
              <FormRow
                icon={<MapPin />}
                label="Địa chỉ nhận*"
                value={form.address}
                onChange={(v) => updateForm("address", v)}
                note
              />
              <FormRow
                icon={<FaFacebook />}
                label="Link Facebook*"
                value={form.facebook}
                onChange={(v) => updateForm("facebook", v)}
              />

              <div className="mb-4 flex items-center gap-3">
                <User />
                <label className="w-32 text-sm">Bạn có được giới thiệu?*</label>
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

              {hasReferral === "yes" && (
                <div className="mb-4 flex items-center gap-3">
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
              )}

              <FormRow
                icon={<Ticket />}
                label="Vị trí đã chọn"
                value={selectedSeats.join(", ") || "Chưa chọn ghế"}
                disabled
              />

              <button
                disabled={!isFormValid}
                onClick={() => setShowConfirm(true)}
                className="mt-6 w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 
                           disabled:cursor-not-allowed rounded-2xl py-4 font-bold text-base md:text-lg 
                           shadow-lg fixed bottom-4 left-4 right-4 z-40 md:static md:mt-8"
              >
                Thanh toán ({totalPrice.toLocaleString()} VNĐ)
              </button>
            </div>
          </div>

          {/* SEAT MAP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
              Sơ đồ ghế – “Khúc Yêu Thương 2026”
            </h2>

            <div className="bg-white/10 rounded-2xl p-4 md:p-6 shadow-xl overflow-auto max-h-[60vh] md:max-h-none">
              {/* STAGE – sticky trên mobile */}
              <div className="flex justify-center mb-4 md:mb-6 sticky top-0 z-10 bg-slate-900/70 backdrop-blur-sm py-2 md:py-0 md:static">
                <div className="bg-white text-slate-800 font-bold px-16 md:px-32 py-2 md:py-4 rounded-xl shadow text-sm md:text-base">
                  STAGE
                </div>
              </div>

              <div className="space-y-0.5 md:space-y-1 min-w-[640px] md:min-w-0">
                {seatMatrix.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex gap-0.5 md:gap-1 items-center"
                  >
                    <div className="w-5 md:w-6 text-[10px] md:text-xs text-right mr-1 font-medium opacity-80">
                      {String.fromCharCode(65 + rowIndex)}
                    </div>

                    {row.map((seat) => {
                      const isSelected = selectedSeats.includes(seat.seatCode);
                      const isSold = seat.status === "SOLD";

                      return (
                        <motion.div
                          key={seat.seatCode}
                          whileHover={!isSold ? { scale: 1.2 } : undefined}
                          whileTap={!isSold ? { scale: 0.92 } : undefined}
                          animate={{ scale: isSelected ? 1.18 : 1 }}
                          style={{
                            backgroundColor: isSold
                              ? "#475569"
                              : isSelected
                              ? "#22d3ee"
                              : "#22c55e",
                          }}
                          onClick={() => toggleSeat(seat)}
                          className={`w-5 h-5 md:w-6 md:h-6 rounded text-[9px] md:text-[10px] font-medium 
                                      flex items-center justify-center text-slate-900
                                      ${
                                        isSold
                                          ? "cursor-not-allowed opacity-60"
                                          : "cursor-pointer"
                                      }`}
                        >
                          {seat.seatCode}
                        </motion.div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 text-xs md:text-sm">
              <Legend color="bg-green-500" label="Trống" />
              <Legend color="bg-cyan-400" label="Đang chọn" />
              <Legend color="bg-slate-600" label="Đã bán" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              className="bg-slate-900 rounded-2xl p-6 md:p-8 w-full max-w-[420px]"
            >
              <h3 className="text-lg font-bold mb-4">Xác nhận thanh toán</h3>

              <div className="text-sm space-y-2">
                <p>
                  <b>Họ tên:</b> {form.fullName}
                </p>
                <p>
                  <b>SĐT:</b> {form.phone}
                </p>
                <p>
                  <b>Email:</b> {form.email}
                </p>
                <p>
                  <b>Địa chỉ:</b> {form.address}
                </p>
                <p>
                  <b>Facebook:</b> {form.facebook}
                </p>
                <p>
                  <b>Ghế:</b> {selectedSeats.join(", ")}
                </p>
                <p className="font-semibold text-cyan-400 mt-3">
                  Tổng tiền: {totalPrice.toLocaleString()} VNĐ
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-slate-600 hover:bg-slate-500 rounded-xl py-3 text-sm md:text-base"
                >
                  Hủy
                </button>
                <button className="flex-1 bg-cyan-500 hover:bg-cyan-400 rounded-xl py-3 font-bold text-sm md:text-base">
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
function FormRow({ icon, label, value, onChange, disabled, note }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <div className="text-lg md:text-xl">{icon}</div>
        <label className="w-32 md:w-36 text-sm md:text-base">{label}</label>
        <input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className="flex-1 rounded-xl px-4 py-3 md:py-3.5 text-slate-800 text-sm md:text-base"
        />
      </div>

      {note && (
        <p className="text-xs italic text-slate-300 ml-[52px] md:ml-[60px] mt-1">
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
      <span>{label}</span>
    </div>
  );
}
