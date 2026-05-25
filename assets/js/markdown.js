function markdownToHtml(markdown){

  if(!markdown){
    return "";
  }

  return markdown
    .replace(/^# (.*$)/gim,"<h1>$1</h1>")
    .replace(/^## (.*$)/gim,"<h2>$1</h2>")
    .replace(/^### (.*$)/gim,"<h3>$1</h3>")
    .replace(/\*\*(.*)\*\*/gim,"<strong>$1</strong>")
    .replace(/\n/gim,"<br>");

} 
