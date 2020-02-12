//get the fav list of
let favlist = document.querySelector("#favorites").firstElementChild


document.querySelectorAll('.fave').forEach(item => {
    item.addEventListener('click', event => {
        //handle click
        sib = item.parentNode.nextElementSibling
        if (item.textContent == "\u2661") {
            //change the heart
            item.textContent = "\u2665"

            //timestamp the node
            const timestamp = "n" + Date.now().toString()
            sib.id = timestamp

            //add it to the favlist
            let clnsib = sib.cloneNode(true)
            let fav = document.createElement("tr")
            fav.appendChild(clnsib)
            favlist.appendChild(fav)

        } else {
            //change the heart back
            item.textContent = "\u2661";
            //found the element by timestamp
            temp = "#" + sib.id
            found = favlist.querySelector(temp)
            found.parentNode.removeChild(found)
        }
    })
})

let stationlist = document.querySelector("#stations")
let selectdom = document.querySelector("select")

function addops(selectdom) {
    let ops = ["All", "Loop", "University of Chicago", "North Side"]
    for (i = 0; i < ops.length; i++) {
        let option1 = document.createElement("option")
        option1.id = ops[i]
        option1.textContent = ops[i]
        selectdom.appendChild(option1)
    }
}
addops(selectdom)
var dict = {
    "North Side": "north",
    "University of Chicago": "uchicago",
    "Loop": "loop"
}

document.querySelector('select').addEventListener('change', function() {
    console.log('You selected: ', this.value);
    kids = stationlist.lastElementChild.children
    if (this.value == "All") {
        for (i = 0; i < kids.length; i++) {
            kids[i].style.display = "block"
        }
    } else {
        for (i = 0; i < kids.length; i++) {
            item = kids[i]
            if (item.className != dict[this.value]) {
                item.style.display = 'none';
            } else {
                item.style.display = "block"
            }
        }
    }
});