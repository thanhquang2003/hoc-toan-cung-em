
// Grade-specific question bank; no AI API required.
(function(){
const r=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
const pick=a=>a[r(0,a.length-1)];
function make(prompt,correct,explanation){
 const set=new Set([correct]);let t=0;
 while(set.size<4&&t++<150){const d=Math.max(4,Math.ceil(Math.abs(correct)*.25));const n=correct+r(-d,d);if(Number.isFinite(n)&&n>=-1000)set.add(n)}
 while(set.size<4)set.add(correct+set.size+1);
 const options=[...set];for(let i=options.length-1;i>0;i--){const j=r(0,i);[options[i],options[j]]=[options[j],options[i]]}
 return {prompt,correct,options,explanation};
}
window.gradeQuestion=function(grade,topic,olympic){
 const g=Number(grade),kind=topic==='mix'?pick(g<=1?['add','logic']:g<=3?['add','multiply','logic']:['add','multiply','logic']):topic;
 let a,b,c,correct,prompt,explanation;
 if(g===0){
  if(kind==='logic'){a=r(2,9);b=r(1,9);return make('Số nào lớn hơn: '+a+' hay '+b+'?',Math.max(a,b),'So sánh số lượng.')}
  a=r(1,5);b=r(1,5);return make('Có '+a+' quả táo, thêm '+b+' quả. Có tất cả bao nhiêu quả?',a+b,'Đếm thêm số quả táo.');
 }
 if(g===1){
  a=r(1,olympic?30:15);b=r(1,olympic?30:15);
  if(kind==='logic')return make('Dãy số: '+a+', '+(a+2)+', '+(a+4)+', ... Số tiếp theo?',a+6,'Mỗi bước tăng 2.');
  if(r(0,1)){return make(a+' + '+b+' = ?',a+b,'Cộng hai số.')}
  if(a<b)[a,b]=[b,a];return make(a+' − '+b+' = ?',a-b,'Lấy số lớn trừ số bé.');
 }
 if(g===2){
  if(kind==='logic'){a=r(1,30);return make('Số chẵn tiếp theo sau '+(a*2)+' là?',a*2+2,'Các số chẵn liên tiếp cách nhau 2.')}
  if(kind==='multiply'){a=r(2,5);b=r(2,9);return make(a+' nhóm, mỗi nhóm '+b+' vật. Có bao nhiêu vật?',a*b,'Lấy số nhóm nhân số vật mỗi nhóm.')}
  a=r(20,90);b=r(10,90);return make(a+' + '+b+' = ?',a+b,'Cộng hàng đơn vị rồi đến hàng chục.');
 }
 if(g===3){
  a=r(2,9);b=r(2,9);
  if(kind==='logic')return make('Một hình chữ nhật dài '+(a+4)+' cm, rộng '+b+' cm. Chu vi là?',2*(a+4+b),'Chu vi = 2 × (dài + rộng).');
  if(kind==='multiply')return make((a*b)+' ÷ '+a+' = ?',b,'Phép chia ngược với phép nhân.');
  return make(r(100,500)+' + '+(a*10+b)+' = ?',null,''); // replaced below
 }
 if(g===4){
  a=r(3,15);b=r(2,10);
  if(kind==='logic')return make('Hình vuông cạnh '+a+' cm có diện tích bao nhiêu cm²?',a*a,'Diện tích hình vuông = cạnh × cạnh.');
  if(kind==='multiply')return make(a+' × '+(b*10)+' = ?',a*b*10,'Nhân với 10 rồi nhân tiếp.');
  return make('Tổng của '+(a*10)+' và '+(b*10)+' là?',(a+b)*10,'Cộng hai số.');
 }
 if(g===5){
  a=r(2,12);b=r(2,9);
  if(kind==='logic')return make('Một món hàng giá '+(a*10000)+' đồng, giảm 10%. Số tiền giảm (nghìn đồng) là?',a,'10% của '+(a*10)+' nghìn đồng là '+a+' nghìn đồng.');
  if(kind==='multiply')return make('Diện tích tam giác có đáy '+(a*2)+' cm và chiều cao '+b+' cm là bao nhiêu cm²?',a*b,'Diện tích = đáy × chiều cao ÷ 2.');
  return make('3/4 của '+(a*4)+' bằng?',a*3,'Lấy số chia 4 rồi nhân 3.');
 }
 if(g===6){
  a=r(2,18);b=r(2,15);
  if(kind==='logic')return make('Ước chung lớn nhất của '+(a*2)+' và '+(a*3)+' là?',a,'ƯCLN(2a, 3a) = a.');
  if(kind==='multiply')return make('(-'+a+') × '+b+' = ?',-a*b,'Số âm nhân số dương được số âm.');
  return make('(-'+a+') + '+(a+b)+' = ?',b,'Hai số đối nhau triệt tiêu.');
 }
 if(g===7){
  a=r(2,12);b=r(2,10);
  if(kind==='logic')return make('Hai đại lượng tỉ lệ thuận: x = 2 thì y = '+(a*2)+'. Khi x = 5, y bằng?',a*5,'Hệ số tỉ lệ bằng '+a+'.');
  if(kind==='multiply')return make('(-'+a+')² bằng?',a*a,'Bình phương số âm là số dương.');
  return make('Tìm x: '+a+'x + '+b+' = '+(a*3+b),3,'Trừ '+b+' hai vế rồi chia '+a+'.');
 }
 if(g===8){
  a=r(2,12);b=r(2,9);
  if(kind==='logic')return make('Tam giác vuông có hai cạnh góc vuông 3 cm và 4 cm. Cạnh huyền dài?',5,'Định lý Pythagore: 3² + 4² = 5².');
  if(kind==='multiply')return make('Hệ số của x trong ('+a+'x + '+b+') + (3x − 2) là?',a+3,'Cộng hệ số của các hạng tử đồng dạng.');
  return make('Giải phương trình: '+a+'x − '+b+' = '+(a*4-b)+'. x = ?',4,'Chuyển vế và chia cho '+a+'.');
 }
 a=r(2,12);b=r(2,9);
 if(kind==='logic')return make('Nghiệm dương của x² = '+(a*a)+' là?',a,'Lấy căn bậc hai số học.');
 if(kind==='multiply')return make('Với y = '+a+'x + '+b+', khi x = 3 thì y bằng?',a*3+b,'Thay x = 3 vào biểu thức.');
 return make('Giải: '+a+'x + '+b+' = '+(a*5+b)+'. x = ?',5,'Chuyển vế rồi chia '+a+'.');
};
const original=window.gradeQuestion;
window.gradeQuestion=(grade,topic,olympic)=>{
 const q=original(grade,topic,olympic);
 if(q.correct!==null)return q;
 const a=r(100,500),b=r(10,99);return make(a+' + '+b+' = ?',a+b,'Cộng lần lượt các hàng.');
};
})();