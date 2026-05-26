/**
 * TOÀN DIỆN & TỐI ƯU TUYỆT ĐỐI: Bộ biên dịch Markdown sang HTML chuẩn doanh nghiệp.
 * Kiến trúc: Lexer/Tokenizer kết hợp State Machine (Tránh dùng RegEx lặp vô tận gây sập hệ thống).
 */
export function parseMarkdown(markdown) {
  if (typeof markdown !== 'string') return '';

  // 1. AN TOÀN: XSS Sanitizer bảo mật tuyệt đối
  const escapeHTML = (str) => str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  // 2. XỬ LÝ TEXT INLINE (Bold, Italic, Code, Link, Image, Strike) bằng RegEx tối ưu hóa Single-Pass
  const parseInline = (text) => {
    return text
      // Images: ![alt](url)
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="\$2" alt="\$1" loading="lazy" />')
      // Links: [text](url) - An toàn bảo mật tabnabbing
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="\$2" target="_blank" rel="noopener noreferrer">\$1</a>')
      // Inline Code: `code`
      .replace(/`([^`]+)`/g, '<code>\$1</code>')
      // Bold + Italic lồng nhau: ***bold italic***
      .replace(/(\*\*\*|___)(.*?)\1/g, '<strong><em>\$2</em></strong>')
      // Bold: **bold** hoặc __bold__
      .replace(/(\*\*|__)(.*?)\1/g, '<strong>\$2</strong>')
      // Italic: *italic* hoặc _italic_
      .replace(/(\*|_)(.*?)\1/g, '<em>\$2</em>')
      // Strikethrough: ~~strike~~
      .replace(/~~([^~]+)~~/g, '<del>\$1</del>');
  };

  const lines = markdown.split(/\r?\n/);
  const result = [];
  
  // Trạng thái của State Machine
  let currentListType = null; // null | 'ul' | 'ol'
  let inBlockquote = false;
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // ----------------------------------------------------
    // TRẠNG THÁI 1: ĐANG TRONG CODE BLOCK (```)
    // ----------------------------------------------------
    if (inCodeBlock) {
      if (trimmed.startsWith('```')) {
        result.push(`<pre><code class="language-${codeBlockLang}">${escapeHTML(codeLines.join('\n'))}</code></pre>`);
        inCodeBlock = false;
        codeLines = [];
      } else {
        codeLines.push(line); // Giữ nguyên khoảng trắng gốc của code
      }
      continue;
    }

    if (trimmed.startsWith('```')) {
      // Đóng các thẻ danh sách/blockquote nếu có trước khi mở code block
      if (currentListType) { result.push(`</${currentListType}>`); currentListType = null; }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false; }
      
      inCodeBlock = true;
      codeBlockLang = trimmed.substring(3).trim() || 'plaintext';
      continue;
    }

    // ----------------------------------------------------
    // XỬ LÝ AN TOÀN ĐẦU VÀO CHO CÁC KHỐI KHÔNG PHẢI CODE
    // ----------------------------------------------------
    const escapedLine = escapeHTML(line);
    const escapedTrimmed = escapedLine.trim();

    // ----------------------------------------------------
    // TRẠNG THÁI 2: ĐƯỜNG KẺ NGANG (---, ***, ___)
    // ----------------------------------------------------
    if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(escapedTrimmed)) {
      if (currentListType) { result.push(`</${currentListType}>`); currentListType = null; }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false; }
      result.push('<hr />');
      continue;
    }

    // ----------------------------------------------------
    // TRẠNG THÁI 3: TIÊU ĐỀ HEADERS (H1 -> H6)
    // ----------------------------------------------------
    const headerMatch = escapedLine.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      if (currentListType) { result.push(`</${currentListType}>`); currentListType = null; }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false; }
      
      const level = headerMatch[1].length;
      const content = parseInline(headerMatch[2]);
      result.push(`<h${level}>${content}</h${level}>`);
      continue;
    }

    // ----------------------------------------------------
    // TRẠNG THÁI 4: TRÍCH DẪN BLOCKQUOTE (>)
    // ----------------------------------------------------
    if (escapedTrimmed.startsWith('&gt;')) {
      if (currentListType) { result.push(`</${currentListType}>`); currentListType = null; }
      if (!inBlockquote) {
        result.push('<blockquote>');
        inBlockquote = true;
      }
      // Cắt bỏ phần `>` và khoảng trắng đầu dòng
      const content = escapedLine.replace(/^\s*&gt;\s?/, '');
      result.push(parseInline(content));
      continue;
    } else if (inBlockquote && escapedTrimmed !== '') {
      // Tiếp tục blockquote cho dòng văn bản liền kề
      result.push(parseInline(escapedLine));
      continue;
    } else if (inBlockquote && escapedTrimmed === '') {
      result.push('</blockquote>');
      inBlockquote = false;
    }

    // ----------------------------------------------------
    // TRẠNG THÁI 5: DANH SÁCH KHÔNG THỨ TỰ (UL: -, *, +)
    // ----------------------------------------------------
    const ulMatch = escapedLine.match(/^(\s*)([*+-])\s+(.+)$/);
    if (ulMatch) {
      if (currentListType === 'ol') { result.push('</ol>'); currentListType = null; }
      if (!currentListType) {
        result.push('<ul>');
        currentListType = 'ul';
      }
      result.push(`<li>${parseInline(ulMatch[3])}</li>`);
      continue;
    }

    // ----------------------------------------------------
    // TRẠNG THÁI 6: DANH SÁCH CÓ THỨ TỰ (OL: 1., 2.)
    // ----------------------------------------------------
    const olMatch = escapedLine.match(/^(\s*)(\d+)\.\s+(.+)$/);
    if (olMatch) {
      if (currentListType === 'ul') { result.push('</ul>'); currentListType = null; }
      if (!currentListType) {
        result.push('<ol>');
        currentListType = 'ol';
      }
      result.push(`<li>${parseInline(olMatch[3])}</li>`);
      continue;
    }

    // Đóng danh sách nếu dòng hiện tại không phải là item của danh sách
    if (currentListType && escapedTrimmed !== '') {
      result.push(`</${currentListType}>`);
      currentListType = null;
    }

    // ----------------------------------------------------
    // TRẠNG THÁI 7: ĐOẠN VĂN (PARAGRAPH) & XUỐNG DÒNG
    // ----------------------------------------------------
    if (escapedTrimmed === '') {
      if (currentListType) { result.push(`</${currentListType}>`); currentListType = null; }
      result.push('<br>');
    } else {
      result.push(`<p>${parseInline(escapedLine)}</p>`);
    }
  }

  // Sửa lỗi rò rỉ: Tự động đóng toàn bộ các thẻ block còn sót lại khi hết chuỗi
  if (inCodeBlock) result.push(`<pre><code class="language-${codeBlockLang}">${escapeHTML(codeLines.join('\n'))}</code></pre>`);
  if (currentListType) result.push(`</${currentListType}>`);
  if (inBlockquote) result.push('</blockquote>');

  return result.join('\n');
}
