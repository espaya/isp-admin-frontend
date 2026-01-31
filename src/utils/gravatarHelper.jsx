import md5 from "md5";

export default function gravatarUrl(email, size = 80, defaultType = "identicon") {
  const cleanEmail = email.trim().toLowerCase();
  const hash = md5(cleanEmail);

  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultType}`;
}
