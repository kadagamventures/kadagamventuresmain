// utils/validateLeadFile.js

const blockedMimeTypes = [
  "application/x-msdownload",        // .exe
  "application/x-msdos-program",     // windows exe
  "application/x-sh",                // shell script
  "application/x-bash",              // bash script
  "application/javascript",          // js
  "text/javascript",                 // js
  "text/html",                       // html
  "application/x-php",               // php
  "application/x-httpd-php",         // php
  "application/x-python-code",       // python compiled
];

const blockedExtensions = [
  ".exe",
  ".sh",
  ".bat",
  ".cmd",
  ".js",
  ".html",
  ".php",
  ".py",
];

exports.validateLeadFile = (file) => {
  if (!file) return;

  const maxSize = 20 * 1024 * 1024; // 20MB

  // Size check
  if (file.size > maxSize) {
    throw new Error("File size exceeds 20MB limit.");
  }

  // MIME type check
  if (blockedMimeTypes.includes(file.mimetype)) {
    throw new Error("This file type is not allowed.");
  }

  // Extension check
  const fileName = file.originalname.toLowerCase();
  const hasBlockedExtension = blockedExtensions.some((ext) =>
    fileName.endsWith(ext)
  );

  if (hasBlockedExtension) {
    throw new Error("This file extension is not allowed.");
  }
};