(function () {
  const C = window.SITE_CONFIG;
  const $ = (sel) => document.querySelector(sel);
  const el = (tag, attrs = {}, text) => {
    const n = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    if (text != null) n.textContent = text;
    return n;
  };
  const euros = (n) => Math.round(n).toLocaleString("fr-FR");
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), C);

  const groupe = C.groupe || [];
  const objectif = C.objectifGroupe || 4;
  const serviceLabel = Object.fromEntries(C.services.map((s) => [s.id, s.label]));

  // ── Simple text bindings ──
  document.querySelectorAll("[data-bind]").forEach((n) => {
    const key = n.dataset.bind;
    const v = key === "groupe.count" ? groupe.length : get(key);
    if (v != null) n.textContent = v;
  });

  // ── Progress ──
  const pct = Math.min(100, (groupe.length / objectif) * 100);
  $("[data-progress]").style.width = pct + "%";
  const restant = Math.max(0, objectif - groupe.length);
  $("[data-hero-note]").textContent =
    groupe.length === 0
      ? "Soyez le premier ou la première à lancer le groupe."
      : restant > 0
      ? `Encore ${restant} place${restant > 1 ? "s" : ""} pour compléter le groupe.`
      : "Le groupe est constitué — les candidatures restent ouvertes pour des créneaux.";

  // ── Facts about the office ──
  const B = C.bureau;
  const facts = [
    ["Surface", B.surfaceM2 && `${B.surfaceM2} m²`],
    ["Loyer CC (TTC)", B.loyerMensuelCC && `${euros(B.loyerMensuelCC)} € / mois`],
    ["Étage", B.etage],
    ["Bureaux", B.nombreBureaux],
    ["Parking", B.parking],
    ["Disponibilité", B.disponibilite],
    ["Adresse", B.adresse],
  ].filter(([, v]) => v);
  const dl = $("[data-facts]");
  facts.forEach(([k, v]) => {
    const d = el("div");
    d.append(el("dt", {}, k), el("dd", {}, String(v)));
    dl.append(d);
  });
  (B.atouts || []).forEach((a) => $("[data-atouts]").append(el("li", {}, a)));
  const annonce = $("[data-annonce]");
  if (B.annonceUrl) annonce.href = B.annonceUrl;
  else annonce.parentElement.remove();
  (B.photos || []).forEach((p) => {
    const f = el("figure");
    f.append(el("img", { src: p.src, alt: p.legende || "", loading: "lazy" }));
    if (p.legende) f.append(el("figcaption", {}, p.legende));
    $("[data-photos]").append(f);
  });

  // ── Cost simulator ──
  const total = B.loyerMensuelCC || 0;
  if (!total) {
    $("[data-simu]").remove();
    document.querySelector(".local-grid").style.gridTemplateColumns = "1fr";
  } else {
    const range = $("#simu-n");
    range.value = Math.max(2, Math.min(Number(range.max), objectif));
    const upd = () => {
      const n = Number(range.value);
      $("[data-simu-n]").textContent = n;
      $("[data-simu-result]").textContent = euros(total / n);
      $("[data-simu-m2]").textContent = B.surfaceM2
        ? `Soit environ ${euros(B.surfaceM2 / n)} m² par personne, espaces communs compris.`
        : "";
    };
    range.addEventListener("input", upd);
    upd();
  }

  // ── Group members ──
  const members = $("[data-members]");
  groupe.forEach((m) => {
    const card = el("div", { class: "member" });
    const confirme = (m.statut || "").startsWith("confirm");
    card.append(el("span", { class: "badge" + (confirme ? " confirme" : "") }, confirme ? "Confirmé·e" : "Intéressé·e"));
    card.append(el("h3", {}, m.profession));
    if (m.jours && m.jours.length) card.append(el("p", { class: "days" }, "Présence : " + m.jours.join(", ")));
    members.append(card);
  });
  const libres = Math.max(1, objectif - groupe.length);
  const open = el("a", { class: "member open", href: "#rejoindre" });
  open.append(
    el("span", {}, `${libres} place${libres > 1 ? "s" : ""} disponible${libres > 1 ? "s" : ""}\n`),
    el("strong", {}, "Et si c'était vous ?")
  );
  open.style.whiteSpace = "pre-line";
  members.append(open);

  // ── Service tally ──
  const counts = {};
  groupe.forEach((m) => (m.services || []).forEach((s) => (counts[s] = (counts[s] || 0) + 1)));
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (!top.length) $("[data-tally-wrap]").remove();
  top.forEach(([id, n]) => {
    const li = el("li");
    const bar = el("div", { class: "bar" });
    const fill = el("span");
    fill.style.width = (n / groupe.length) * 100 + "%";
    bar.append(fill);
    li.append(el("span", {}, serviceLabel[id] || id), bar, el("span", { class: "muted" }, `${n}/${groupe.length}`));
    $("[data-tally]").append(li);
  });

  // ── Form: professions & services ──
  const sel = $("[data-professions]");
  C.professions.forEach((p) => sel.append(el("option", { value: p }, p)));
  sel.addEventListener("change", () => $("[data-autre]").classList.toggle("hidden", sel.value !== "Autre"));

  const cats = [...new Set(C.services.map((s) => s.cat))];
  cats.forEach((cat) => {
    const box = el("div", { class: "service-cat" });
    box.append(el("h4", {}, cat));
    const list = el("div", { class: "service-list" });
    C.services.filter((s) => s.cat === cat).forEach((s) => {
      const lab = el("label", { class: "service" });
      lab.append(el("input", { type: "checkbox", name: "services", value: s.id }), el("span", {}, s.label));
      if (s.surPlace) lab.append(el("em", { class: "tag" }, "déjà sur place"));
      list.append(lab);
    });
    box.append(list);
    $("[data-services]").append(box);
  });

  // ── Footer contact ──
  const ct = C.contact;
  const fc = $("[data-contact]");
  if (ct.email) {
    fc.append("Contact : ");
    fc.append(el("a", { href: "mailto:" + ct.email }, ct.email));
  }
  if (ct.telephone) fc.append(" · " + ct.telephone);

  // ── Submit ──
  const form = $("#form");
  const err = $("[data-error]");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    err.textContent = "";
    const fd = new FormData(form);
    const required = [["nom", "votre nom"], ["profession", "votre profession"], ["email", "votre e-mail"]];
    for (const [k, lab] of required) {
      if (!String(fd.get(k) || "").trim()) return (err.textContent = `Merci d'indiquer ${lab}.`);
    }
    if (!form.email.checkValidity()) return (err.textContent = "L'adresse e-mail ne semble pas valide.");
    if (!fd.get("rgpd")) return (err.textContent = "Merci d'accepter d'être recontacté·e.");

    const profession = fd.get("profession") === "Autre" ? fd.get("profession_autre") || "Autre" : fd.get("profession");
    const services = fd.getAll("services").map((id) => serviceLabel[id]);
    const data = {
      Nom: fd.get("nom"),
      Profession: profession,
      Email: fd.get("email"),
      Téléphone: fd.get("telephone") || "—",
      Jours: fd.getAll("jours").join(", ") || "—",
      Usage: fd.get("usage"),
      Budget: fd.get("budget") || "—",
      Arrivée: fd.get("date"),
      "Services souhaités": services.join(" ; ") || "—",
      "Autre service": fd.get("service_autre") || "—",
      Message: fd.get("message") || "—",
      "Affichage dans le groupe": fd.get("affichage") ? "oui" : "non",
      "Identifiants services (pour config.js)": fd.getAll("services").join(", "),
    };

    const btn = form.querySelector("button");
    if (C.formEndpoint) {
      btn.disabled = true;
      try {
        const res = await fetch(C.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _replyto: data.Email, _subject: `Cabinet Beaulieu — ${profession}` }),
        });
        if (!res.ok) throw new Error(res.status);
      } catch {
        btn.disabled = false;
        return (err.textContent = "L'envoi a échoué. Réessayez ou écrivez-nous directement par e-mail.");
      }
    } else {
      const body = Object.entries(data).map(([k, v]) => `${k} : ${v}`).join("\n");
      const subject = `Cabinet partagé Beaulieu — intérêt (${profession})`;
      window.location.href = `mailto:${ct.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      $("[data-thanks] p").textContent =
        "Votre messagerie s'est ouverte avec votre candidature pré-remplie : il ne reste qu'à l'envoyer.";
    }
    form.classList.add("hidden");
    $("[data-thanks]").classList.remove("hidden");
    $("[data-thanks]").scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
