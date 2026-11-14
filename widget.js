/* যেকোনো ওয়েবসাইটে ব্র্যান্ডের পোস্ট দেখানোর উইজেট
   ব্যবহার: <div class="ahm-feed" data-brand="ব্র্যান্ড-কি"></div><script src="https://itsahmarketing-boop.github.io/widget.js" async></script> */
(function () {
  var APP = "https://script.google.com/macros/s/AKfycbxU3xAnzPlI9-0BO_MAcJVt5gMT2_-m1ZtgiiqBO_HwlMkBkBeB_dFu8jpzW1kE9z6ImQ/exec";
  var CSS = ":host{all:initial;display:block;font-family:'Hind Siliguri','Noto Sans Bengali',system-ui,sans-serif;color:#111827}"
    + ".g{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px}"
    + ".c{background:#fff;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;cursor:pointer;transition:box-shadow .2s}"
    + ".c:hover{box-shadow:0 14px 34px -20px rgba(15,23,42,.4)}"
    + ".m{aspect-ratio:16/9;background:#eef2ff;display:block;width:100%;object-fit:cover;border:0}"
    + ".b{padding:14px 16px 16px;display:flex;flex-direction:column;gap:6px;flex:1}"
    + ".k{font-size:12px;color:#6b7280}.t{font-size:18px;font-weight:700;line-height:1.35;margin:0}"
    + ".x{margin:0;color:#4b5563;font-size:15px;line-height:1.6;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;white-space:pre-line}"
    + ".c.o .x{-webkit-line-clamp:unset;display:block}"
    + ".l{display:flex;gap:6px;flex-wrap:wrap;margin-top:auto;padding-top:6px}.l a{font-size:13px;border:1px solid #e5e7eb;border-radius:99px;padding:3px 10px;color:#111827;text-decoration:none}"
    + ".e{color:#6b7280;padding:24px;text-align:center}";
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function run(el) {
    if (el.__ahm) return; el.__ahm = 1;
    var root = el.attachShadow ? el.attachShadow({ mode: "open" }) : el, max = +(el.getAttribute("data-max") || 12);
    root.innerHTML = "<style>" + CSS + "</style><div class='e'>লোড হচ্ছে…</div>";
    fetch(APP + "?feed=" + encodeURIComponent(el.getAttribute("data-brand") || "main_fb")).then(function (r) { return r.json(); }).then(function (j) {
      var ps = (j && j.posts || []).slice(0, max);
      if (!ps.length) { root.innerHTML = "<style>" + CSS + "</style><div class='e'>এখনো কোনো পোস্ট নেই।</div>"; return; }
      root.innerHTML = "<style>" + CSS + "</style><div class='g'>" + ps.map(function (p) {
        var d = p.date ? new Date(p.date).toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" }) : "";
        return "<article class='c'>" + (p.yt ? "<img class='m' loading='lazy' alt='' src='https://i.ytimg.com/vi/" + esc(p.yt) + "/hqdefault.jpg'>" : "")
          + "<div class='b'><span class='k'>" + esc(d) + "</span><h3 class='t'>" + esc(p.title) + "</h3><p class='x'>" + esc(p.text) + "</p>"
          + (p.links && p.links.length ? "<div class='l'>" + p.links.map(function (l) { return "<a target='_blank' rel='noopener' href='" + esc(l.url) + "'>" + esc(l.name) + " ↗</a>"; }).join("") + "</div>" : "")
          + "</div></article>";
      }).join("") + "</div>";
      [].forEach.call(root.querySelectorAll(".c"), function (c) { c.addEventListener("click", function (e) { if (e.target.tagName !== "A") c.classList.toggle("o"); }); });
    }).catch(function () { root.innerHTML = "<style>" + CSS + "</style><div class='e'>পোস্ট লোড করা যায়নি।</div>"; });
  }
  function all() { [].forEach.call(document.querySelectorAll(".ahm-feed"), run); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", all); else all();
})();
