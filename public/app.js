async function helloWorld(){
    let msg = await fetch('http://localhost:3000/api/helloWorld');
    return await msg.text();
}
helloWorld().then((res) => {
    console.log(res);
    let root = document.getElementById('root');
    // root.textContent = res;
    root.innerHTML = res;
});