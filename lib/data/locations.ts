export interface District {
  name: string;
  wards: string[];
}

export interface Province {
  name: string;
  districts: District[];
}

export const PROVINCES: Province[] = [
  {
    name: "Hà Nội",
    districts: [
      { name: "Quận Cầu Giấy", wards: ["Phường Dịch Vọng", "Phường Dịch Vọng Hậu", "Phường Mai Dịch", "Phường Nghĩa Đô", "Phường Quan Hoa", "Phường Yên Hòa"] },
      { name: "Quận Đống Đa", wards: ["Phường Láng Hạ", "Phường Quang Trung", "Phường Trung Liệt", "Phường Văn Miếu", "Phường Ô Chợ Dừa"] },
      { name: "Quận Hoàn Kiếm", wards: ["Phường Hàng Bạc", "Phường Hàng Trống", "Phường Tràng Tiền", "Phường Lý Thái Tổ"] },
      { name: "Quận Hai Bà Trưng", wards: ["Phường Bách Khoa", "Phường Bạch Mai", "Phường Minh Khai", "Phường Thanh Nhàn"] },
      { name: "Quận Nam Từ Liêm", wards: ["Phường Mỹ Đình 1", "Phường Mỹ Đình 2", "Phường Cầu Diễn", "Phường Mễ Trì"] },
    ],
  },
  {
    name: "TP. Hồ Chí Minh",
    districts: [
      { name: "Quận 1", wards: ["Phường Bến Nghé", "Phường Bến Thành", "Phường Đa Kao", "Phường Nguyễn Thái Bình", "Phường Tân Định"] },
      { name: "Quận 3", wards: ["Phường Võ Thị Sáu", "Phường 4", "Phường 5", "Phường 9", "Phường 14"] },
      { name: "Quận 10", wards: ["Phường 1", "Phường 2", "Phường 9", "Phường 12", "Phường 14"] },
      { name: "Quận Bình Thạnh", wards: ["Phường 1", "Phường 3", "Phường 15", "Phường 25", "Phường 26"] },
      { name: "TP. Thủ Đức", wards: ["Phường Linh Chiểu", "Phường Linh Trung", "Phường Hiệp Phú", "Phường Thảo Điền", "Phường An Phú"] },
    ],
  },
  {
    name: "Đà Nẵng",
    districts: [
      { name: "Quận Hải Châu", wards: ["Phường Hải Châu 1", "Phường Nam Dương", "Phường Thạch Thang", "Phường Hòa Cường Bắc"] },
      { name: "Quận Thanh Khê", wards: ["Phường An Khê", "Phường Chính Gián", "Phường Tân Chính", "Phường Xuân Hà"] },
      { name: "Quận Sơn Trà", wards: ["Phường An Hải Bắc", "Phường Mân Thái", "Phường Phước Mỹ", "Phường Thọ Quang"] },
    ],
  },
  {
    name: "Hải Phòng",
    districts: [
      { name: "Quận Lê Chân", wards: ["Phường An Biên", "Phường Cát Dài", "Phường Dư Hàng", "Phường Trại Cau"] },
      { name: "Quận Ngô Quyền", wards: ["Phường Cầu Đất", "Phường Lạch Tray", "Phường Máy Tơ", "Phường Đằng Giang"] },
    ],
  },
  {
    name: "Cần Thơ",
    districts: [
      { name: "Quận Ninh Kiều", wards: ["Phường An Cư", "Phường An Hòa", "Phường Tân An", "Phường Xuân Khánh"] },
      { name: "Quận Cái Răng", wards: ["Phường Ba Láng", "Phường Hưng Phú", "Phường Lê Bình"] },
    ],
  },
  {
    name: "Bình Dương",
    districts: [
      { name: "TP. Thủ Dầu Một", wards: ["Phường Phú Cường", "Phường Phú Hòa", "Phường Hiệp Thành", "Phường Chánh Nghĩa"] },
      { name: "TP. Dĩ An", wards: ["Phường Dĩ An", "Phường Đông Hòa", "Phường Tân Bình"] },
    ],
  },
];
