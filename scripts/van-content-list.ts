/**
 * Danh sách tác phẩm Ngữ Văn lớp 6-12 theo chương trình 2018.
 * Export dưới dạng array để van-solver-claude.ts duyệt qua.
 */

export interface VanItem {
  lop: number;
  bo_sach: "ket-noi-tri-thuc" | "chan-troi-sang-tao" | "canh-dieu";
  tap: number;
  ten_tac_pham: string;
  tac_gia?: string;
  the_loai: string; // truyen-ngan | tho | truyen-dai | kich | nghi-luan | van-ban-thong-tin
  slug_suffix: string; // phần sau "soan-bai-" / "van-mau-" / "tom-tat-"
}

export const VAN_ITEMS: VanItem[] = [
  // ═══════════════════════════════════════════════════════════
  // LỚP 12 — Kết nối tri thức
  // ═══════════════════════════════════════════════════════════
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Tuyên ngôn Độc lập", tac_gia: "Hồ Chí Minh", the_loai: "nghi-luan", slug_suffix: "tuyen-ngon-doc-lap-ho-chi-minh" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Tây Tiến", tac_gia: "Quang Dũng", the_loai: "tho", slug_suffix: "tay-tien-quang-dung" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Việt Bắc", tac_gia: "Tố Hữu", the_loai: "tho", slug_suffix: "viet-bac-to-huu" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Đất Nước", tac_gia: "Nguyễn Khoa Điềm", the_loai: "tho", slug_suffix: "dat-nuoc-nguyen-khoa-diem" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Sóng", tac_gia: "Xuân Quỳnh", the_loai: "tho", slug_suffix: "song-xuan-quynh" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Đàn ghi ta của Lor-ca", tac_gia: "Thanh Thảo", the_loai: "tho", slug_suffix: "dan-ghi-ta-cua-lor-ca-thanh-thao" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Người lái đò Sông Đà", tac_gia: "Nguyễn Tuân", the_loai: "truyen-ngan", slug_suffix: "nguoi-lai-do-song-da-nguyen-tuan" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Ai đã đặt tên cho dòng sông", tac_gia: "Hoàng Phủ Ngọc Tường", the_loai: "truyen-ngan", slug_suffix: "ai-da-dat-ten-cho-dong-song" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Vợ chồng A Phủ", tac_gia: "Tô Hoài", the_loai: "truyen-ngan", slug_suffix: "vo-chong-a-phu-to-hoai" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Vợ nhặt", tac_gia: "Kim Lân", the_loai: "truyen-ngan", slug_suffix: "vo-nhat-kim-lan" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Rừng xà nu", tac_gia: "Nguyễn Trung Thành", the_loai: "truyen-ngan", slug_suffix: "rung-xa-nu-nguyen-trung-thanh" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Những đứa con trong gia đình", tac_gia: "Nguyễn Thi", the_loai: "truyen-ngan", slug_suffix: "nhung-dua-con-trong-gia-dinh-nguyen-thi" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Chiếc thuyền ngoài xa", tac_gia: "Nguyễn Minh Châu", the_loai: "truyen-ngan", slug_suffix: "chiec-thuyen-ngoai-xa-nguyen-minh-chau" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Một người Hà Nội", tac_gia: "Nguyễn Khải", the_loai: "truyen-ngan", slug_suffix: "mot-nguoi-ha-noi-nguyen-khai" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Hồn Trương Ba, da hàng thịt", tac_gia: "Lưu Quang Vũ", the_loai: "kich", slug_suffix: "hon-truong-ba-da-hang-thit-luu-quang-vu" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Nhìn về vốn văn hóa dân tộc", tac_gia: "Trần Đình Hượu", the_loai: "nghi-luan", slug_suffix: "nhin-ve-von-van-hoa-dan-toc" },
  { lop: 12, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Mùa xuân nho nhỏ", tac_gia: "Thanh Hải", the_loai: "tho", slug_suffix: "mua-xuan-nho-nho-thanh-hai" },

  // ═══════════════════════════════════════════════════════════
  // LỚP 12 — Chân trời sáng tạo
  // ═══════════════════════════════════════════════════════════
  { lop: 12, bo_sach: "chan-troi-sang-tao", tap: 1, ten_tac_pham: "Tuyên ngôn Độc lập", tac_gia: "Hồ Chí Minh", the_loai: "nghi-luan", slug_suffix: "tuyen-ngon-doc-lap-ctst" },
  { lop: 12, bo_sach: "chan-troi-sang-tao", tap: 1, ten_tac_pham: "Tây Tiến", tac_gia: "Quang Dũng", the_loai: "tho", slug_suffix: "tay-tien-ctst" },
  { lop: 12, bo_sach: "chan-troi-sang-tao", tap: 1, ten_tac_pham: "Đất Nước", tac_gia: "Nguyễn Khoa Điềm", the_loai: "tho", slug_suffix: "dat-nuoc-ctst" },
  { lop: 12, bo_sach: "chan-troi-sang-tao", tap: 1, ten_tac_pham: "Vợ nhặt", tac_gia: "Kim Lân", the_loai: "truyen-ngan", slug_suffix: "vo-nhat-ctst" },
  { lop: 12, bo_sach: "chan-troi-sang-tao", tap: 1, ten_tac_pham: "Rừng xà nu", tac_gia: "Nguyễn Trung Thành", the_loai: "truyen-ngan", slug_suffix: "rung-xa-nu-ctst" },
  { lop: 12, bo_sach: "chan-troi-sang-tao", tap: 1, ten_tac_pham: "Chiếc thuyền ngoài xa", tac_gia: "Nguyễn Minh Châu", the_loai: "truyen-ngan", slug_suffix: "chiec-thuyen-ngoai-xa-ctst" },
  { lop: 12, bo_sach: "chan-troi-sang-tao", tap: 2, ten_tac_pham: "Hồn Trương Ba, da hàng thịt", tac_gia: "Lưu Quang Vũ", the_loai: "kich", slug_suffix: "hon-truong-ba-ctst" },
  { lop: 12, bo_sach: "chan-troi-sang-tao", tap: 2, ten_tac_pham: "Sóng", tac_gia: "Xuân Quỳnh", the_loai: "tho", slug_suffix: "song-ctst" },
  { lop: 12, bo_sach: "chan-troi-sang-tao", tap: 2, ten_tac_pham: "Người lái đò Sông Đà", tac_gia: "Nguyễn Tuân", the_loai: "truyen-ngan", slug_suffix: "nguoi-lai-do-song-da-ctst" },

  // ═══════════════════════════════════════════════════════════
  // LỚP 12 — Cánh diều
  // ═══════════════════════════════════════════════════════════
  { lop: 12, bo_sach: "canh-dieu", tap: 1, ten_tac_pham: "Tuyên ngôn Độc lập", tac_gia: "Hồ Chí Minh", the_loai: "nghi-luan", slug_suffix: "tuyen-ngon-doc-lap-cd" },
  { lop: 12, bo_sach: "canh-dieu", tap: 1, ten_tac_pham: "Tây Tiến", tac_gia: "Quang Dũng", the_loai: "tho", slug_suffix: "tay-tien-cd" },
  { lop: 12, bo_sach: "canh-dieu", tap: 1, ten_tac_pham: "Việt Bắc", tac_gia: "Tố Hữu", the_loai: "tho", slug_suffix: "viet-bac-cd" },
  { lop: 12, bo_sach: "canh-dieu", tap: 1, ten_tac_pham: "Vợ nhặt", tac_gia: "Kim Lân", the_loai: "truyen-ngan", slug_suffix: "vo-nhat-cd" },
  { lop: 12, bo_sach: "canh-dieu", tap: 1, ten_tac_pham: "Chiếc thuyền ngoài xa", tac_gia: "Nguyễn Minh Châu", the_loai: "truyen-ngan", slug_suffix: "chiec-thuyen-ngoai-xa-cd" },
  { lop: 12, bo_sach: "canh-dieu", tap: 2, ten_tac_pham: "Đất Nước", tac_gia: "Nguyễn Khoa Điềm", the_loai: "tho", slug_suffix: "dat-nuoc-cd" },
  { lop: 12, bo_sach: "canh-dieu", tap: 2, ten_tac_pham: "Hồn Trương Ba, da hàng thịt", tac_gia: "Lưu Quang Vũ", the_loai: "kich", slug_suffix: "hon-truong-ba-cd" },
  { lop: 12, bo_sach: "canh-dieu", tap: 2, ten_tac_pham: "Người lái đò Sông Đà", tac_gia: "Nguyễn Tuân", the_loai: "truyen-ngan", slug_suffix: "nguoi-lai-do-song-da-cd" },

  // ═══════════════════════════════════════════════════════════
  // LỚP 11 — Kết nối tri thức
  // ═══════════════════════════════════════════════════════════
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Chí Phèo", tac_gia: "Nam Cao", the_loai: "truyen-ngan", slug_suffix: "chi-pheo-nam-cao" },
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Hai đứa trẻ", tac_gia: "Thạch Lam", the_loai: "truyen-ngan", slug_suffix: "hai-dua-tre-thach-lam" },
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Chữ người tử tù", tac_gia: "Nguyễn Tuân", the_loai: "truyen-ngan", slug_suffix: "chu-nguoi-tu-tu-nguyen-tuan" },
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Vĩnh biệt Cửu Trùng Đài", tac_gia: "Nguyễn Huy Tưởng", the_loai: "kich", slug_suffix: "vinh-biet-cuu-trung-dai" },
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Từ ấy", tac_gia: "Tố Hữu", the_loai: "tho", slug_suffix: "tu-ay-to-huu" },
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Đây thôn Vĩ Dạ", tac_gia: "Hàn Mặc Tử", the_loai: "tho", slug_suffix: "day-thon-vi-da-han-mac-tu" },
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Tràng giang", tac_gia: "Huy Cận", the_loai: "tho", slug_suffix: "trang-giang-huy-can" },
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Đời thừa", tac_gia: "Nam Cao", the_loai: "truyen-ngan", slug_suffix: "doi-thua-nam-cao" },
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Hạnh phúc của một tang gia", tac_gia: "Vũ Trọng Phụng", the_loai: "truyen-ngan", slug_suffix: "hanh-phuc-cua-mot-tang-gia" },
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Người trong bao", tac_gia: "Sê-khốp", the_loai: "truyen-ngan", slug_suffix: "nguoi-trong-bao-sekhop" },
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Số phận con người", tac_gia: "Sô-lô-khốp", the_loai: "truyen-ngan", slug_suffix: "so-phan-con-nguoi-solokhop" },
  { lop: 11, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Ông già và biển cả", tac_gia: "Hemingway", the_loai: "truyen-dai", slug_suffix: "ong-gia-va-bien-ca-hemingway" },

  // ═══════════════════════════════════════════════════════════
  // LỚP 11 — Chân trời sáng tạo
  // ═══════════════════════════════════════════════════════════
  { lop: 11, bo_sach: "chan-troi-sang-tao", tap: 1, ten_tac_pham: "Chí Phèo", tac_gia: "Nam Cao", the_loai: "truyen-ngan", slug_suffix: "chi-pheo-ctst" },
  { lop: 11, bo_sach: "chan-troi-sang-tao", tap: 1, ten_tac_pham: "Chữ người tử tù", tac_gia: "Nguyễn Tuân", the_loai: "truyen-ngan", slug_suffix: "chu-nguoi-tu-tu-ctst" },
  { lop: 11, bo_sach: "chan-troi-sang-tao", tap: 1, ten_tac_pham: "Đây thôn Vĩ Dạ", tac_gia: "Hàn Mặc Tử", the_loai: "tho", slug_suffix: "day-thon-vi-da-ctst" },
  { lop: 11, bo_sach: "chan-troi-sang-tao", tap: 2, ten_tac_pham: "Hạnh phúc của một tang gia", tac_gia: "Vũ Trọng Phụng", the_loai: "truyen-ngan", slug_suffix: "hanh-phuc-cua-mot-tang-gia-ctst" },
  { lop: 11, bo_sach: "chan-troi-sang-tao", tap: 2, ten_tac_pham: "Số phận con người", tac_gia: "Sô-lô-khốp", the_loai: "truyen-ngan", slug_suffix: "so-phan-con-nguoi-ctst" },

  // ═══════════════════════════════════════════════════════════
  // LỚP 11 — Cánh diều
  // ═══════════════════════════════════════════════════════════
  { lop: 11, bo_sach: "canh-dieu", tap: 1, ten_tac_pham: "Chí Phèo", tac_gia: "Nam Cao", the_loai: "truyen-ngan", slug_suffix: "chi-pheo-cd" },
  { lop: 11, bo_sach: "canh-dieu", tap: 1, ten_tac_pham: "Hai đứa trẻ", tac_gia: "Thạch Lam", the_loai: "truyen-ngan", slug_suffix: "hai-dua-tre-cd" },
  { lop: 11, bo_sach: "canh-dieu", tap: 1, ten_tac_pham: "Đây thôn Vĩ Dạ", tac_gia: "Hàn Mặc Tử", the_loai: "tho", slug_suffix: "day-thon-vi-da-cd" },
  { lop: 11, bo_sach: "canh-dieu", tap: 2, ten_tac_pham: "Vĩnh biệt Cửu Trùng Đài", tac_gia: "Nguyễn Huy Tưởng", the_loai: "kich", slug_suffix: "vinh-biet-cuu-trung-dai-cd" },
  { lop: 11, bo_sach: "canh-dieu", tap: 2, ten_tac_pham: "Ông già và biển cả", tac_gia: "Hemingway", the_loai: "truyen-dai", slug_suffix: "ong-gia-va-bien-ca-cd" },

  // ═══════════════════════════════════════════════════════════
  // LỚP 10 — Kết nối tri thức
  // ═══════════════════════════════════════════════════════════
  { lop: 10, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Thần Trụ Trời", the_loai: "truyen-ngan", slug_suffix: "than-tru-troi-kntt" },
  { lop: 10, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Chiến thắng Mtao Mxây", the_loai: "truyen-ngan", slug_suffix: "chien-thang-mtao-mxay-kntt" },
  { lop: 10, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Truyện An Dương Vương và Mị Châu - Trọng Thủy", the_loai: "truyen-ngan", slug_suffix: "an-duong-vuong-mi-chau-trong-thuy-kntt" },
  { lop: 10, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Tấm Cám", the_loai: "truyen-ngan", slug_suffix: "tam-cam-kntt" },
  { lop: 10, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Nhàn", tac_gia: "Nguyễn Bỉnh Khiêm", the_loai: "tho", slug_suffix: "nhan-nguyen-binh-khiem-kntt" },
  { lop: 10, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Bình Ngô Đại Cáo", tac_gia: "Nguyễn Trãi", the_loai: "nghi-luan", slug_suffix: "binh-ngo-dai-cao-nguyen-trai-kntt" },
  { lop: 10, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Đọc Tiểu Thanh kí", tac_gia: "Nguyễn Du", the_loai: "tho", slug_suffix: "doc-tieu-thanh-ki-nguyen-du-kntt" },
  { lop: 10, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Chuyện chức phán sự đền Tản Viên", tac_gia: "Nguyễn Dữ", the_loai: "truyen-ngan", slug_suffix: "chuyen-chuc-phan-su-den-tan-vien-kntt" },

  // ═══════════════════════════════════════════════════════════
  // LỚP 9 — Kết nối tri thức
  // ═══════════════════════════════════════════════════════════
  { lop: 9, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Làng", tac_gia: "Kim Lân", the_loai: "truyen-ngan", slug_suffix: "lang-kim-lan-kntt" },
  { lop: 9, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Lặng lẽ Sa Pa", tac_gia: "Nguyễn Thành Long", the_loai: "truyen-ngan", slug_suffix: "lang-le-sa-pa-kntt" },
  { lop: 9, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Chiếc lược ngà", tac_gia: "Nguyễn Quang Sáng", the_loai: "truyen-ngan", slug_suffix: "chiec-luoc-nga-kntt" },
  { lop: 9, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Đoàn thuyền đánh cá", tac_gia: "Huy Cận", the_loai: "tho", slug_suffix: "doan-thuyen-danh-ca-kntt" },
  { lop: 9, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Bếp lửa", tac_gia: "Bằng Việt", the_loai: "tho", slug_suffix: "bep-lua-bang-viet-kntt" },
  { lop: 9, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Ánh trăng", tac_gia: "Nguyễn Duy", the_loai: "tho", slug_suffix: "anh-trang-nguyen-duy-kntt" },
  { lop: 9, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Mùa xuân nho nhỏ", tac_gia: "Thanh Hải", the_loai: "tho", slug_suffix: "mua-xuan-nho-nho-kntt" },
  { lop: 9, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Sang thu", tac_gia: "Hữu Thỉnh", the_loai: "tho", slug_suffix: "sang-thu-huu-thinh-kntt" },
  { lop: 9, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Nói với con", tac_gia: "Y Phương", the_loai: "tho", slug_suffix: "noi-voi-con-y-phuong-kntt" },
  { lop: 9, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Bến quê", tac_gia: "Nguyễn Minh Châu", the_loai: "truyen-ngan", slug_suffix: "ben-que-nguyen-minh-chau-kntt" },
  { lop: 9, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Những ngôi sao xa xôi", tac_gia: "Lê Minh Khuê", the_loai: "truyen-ngan", slug_suffix: "nhung-ngoi-sao-xa-xoi-kntt" },

  // ═══════════════════════════════════════════════════════════
  // LỚP 8 — Kết nối tri thức
  // ═══════════════════════════════════════════════════════════
  { lop: 8, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Trong lòng mẹ", tac_gia: "Nguyên Hồng", the_loai: "truyen-ngan", slug_suffix: "trong-long-me-nguyen-hong-kntt" },
  { lop: 8, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Tức nước vỡ bờ", tac_gia: "Ngô Tất Tố", the_loai: "truyen-ngan", slug_suffix: "tuc-nuoc-vo-bo-kntt" },
  { lop: 8, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Lão Hạc", tac_gia: "Nam Cao", the_loai: "truyen-ngan", slug_suffix: "lao-hac-nam-cao-kntt" },
  { lop: 8, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Tôi đi học", tac_gia: "Thanh Tịnh", the_loai: "truyen-ngan", slug_suffix: "toi-di-hoc-thanh-tinh-kntt" },
  { lop: 8, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Quê hương", tac_gia: "Tế Hanh", the_loai: "tho", slug_suffix: "que-huong-te-hanh-kntt" },
  { lop: 8, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Khi con tu hú", tac_gia: "Tố Hữu", the_loai: "tho", slug_suffix: "khi-con-tu-hu-to-huu-kntt" },
  { lop: 8, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Nhớ rừng", tac_gia: "Thế Lữ", the_loai: "tho", slug_suffix: "nho-rung-the-lu-kntt" },
  { lop: 8, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Ông Đồ", tac_gia: "Vũ Đình Liên", the_loai: "tho", slug_suffix: "ong-do-vu-dinh-lien-kntt" },

  // ═══════════════════════════════════════════════════════════
  // LỚP 7 — Kết nối tri thức
  // ═══════════════════════════════════════════════════════════
  { lop: 7, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Tôi và chúng ta", tac_gia: "Lưu Quang Vũ", the_loai: "kich", slug_suffix: "toi-va-chung-ta-luu-quang-vu-kntt" },
  { lop: 7, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Tiếng gà trưa", tac_gia: "Xuân Quỳnh", the_loai: "tho", slug_suffix: "tieng-ga-trua-xuan-quynh-kntt" },
  { lop: 7, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Mẹ và quả", tac_gia: "Nguyễn Khoa Điềm", the_loai: "tho", slug_suffix: "me-va-qua-nguyen-khoa-diem-kntt" },
  { lop: 7, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Cổng trường mở ra", tac_gia: "Lý Lan", the_loai: "truyen-ngan", slug_suffix: "cong-truong-mo-ra-kntt" },
  { lop: 7, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Người thầy đầu tiên", tac_gia: "Aimatov", the_loai: "truyen-ngan", slug_suffix: "nguoi-thay-dau-tien-kntt" },

  // ═══════════════════════════════════════════════════════════
  // LỚP 6 — Kết nối tri thức
  // ═══════════════════════════════════════════════════════════
  { lop: 6, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Bài học đường đời đầu tiên", tac_gia: "Tô Hoài", the_loai: "truyen-ngan", slug_suffix: "bai-hoc-duong-doi-dau-tien-kntt" },
  { lop: 6, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Sông nước Cà Mau", tac_gia: "Đoàn Giỏi", the_loai: "truyen-ngan", slug_suffix: "song-nuoc-ca-mau-kntt" },
  { lop: 6, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Vượt thác", tac_gia: "Võ Quảng", the_loai: "truyen-ngan", slug_suffix: "vuot-thac-vo-quang-kntt" },
  { lop: 6, bo_sach: "ket-noi-tri-thuc", tap: 1, ten_tac_pham: "Bức tranh của em gái tôi", tac_gia: "Tạ Duy Anh", the_loai: "truyen-ngan", slug_suffix: "buc-tranh-cua-em-gai-toi-kntt" },
  { lop: 6, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Cô Tô", tac_gia: "Nguyễn Tuân", the_loai: "truyen-ngan", slug_suffix: "co-to-nguyen-tuan-kntt" },
  { lop: 6, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Lượm", tac_gia: "Tố Hữu", the_loai: "tho", slug_suffix: "luom-to-huu-kntt" },
  { lop: 6, bo_sach: "ket-noi-tri-thuc", tap: 2, ten_tac_pham: "Mưa", tac_gia: "Trần Đăng Khoa", the_loai: "tho", slug_suffix: "mua-tran-dang-khoa-kntt" },
];
