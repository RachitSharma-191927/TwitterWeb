const tweets=document.querySelector("#tweetS");
console.log("Script File")
tweets.addEventListener("click",()=>{
    var tweet=document.querySelector("#tweetAdd").value;
    if(tweet=="")
    {
        return;
    }
    fetch("/addTweets",{
        method:"POST",
        mode:"cors",
        body:JSON.stringify({
            tweet:tweet,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data)=>{
        location.reload();
    })
    .catch((e)=>{
        alert("Invalid Request");
    })
})
