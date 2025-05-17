
let body = document.querySelector('body')

// 1 Select and cache the <main>
let mainEl = document.querySelector('main')
// 2 Set the background color of mainEl
mainEl.style.backgroundColor = 'var(--main-bg)'
// 3 Set the content of mainEl to <h1>DOM Manipulation</h1>
// let h1 = document.createElement('h1')
mainEl.innerHTML = '<h1>Dom Manipulation</h1>'
// 4 Add a class of flex-ctr to mainEl
mainEl.classList.add('flex-ctr')

body.appendChild(mainEl)


//PART 2

// 1 Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
let topMenuEl = document.getElementById('top-menu')
// 2 Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height="100%"
// 3 Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)'
// 4 Add a class of flex-around to topMenuEl.
topMenuEl.classList.add('flex-around')



var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

menuLinks.forEach((item)=>{
    const newAnchorTag = document.createElement('a')
    newAnchorTag.href = item.href
    newAnchorTag.textContent = item.text
    topMenuEl.appendChild(newAnchorTag)
});


//PART 2 Step 3 Creating Submenue

// 1 Select and cache the <nav id="sub-menu"> element in a variable named topMenuEl.
let subMenuEl = document.getElementById('sub-menu')
// 2 Set the height of the subMenuEl element to be 100%.
subMenuEl.style.height="100%"
// 3 Set the background color of subMenuEl to the value stored in the --top-menu-bg CSS custom property
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'
// 4 Add a class of flex-around to subMenuEl.
subMenuEl.classList.add('flex-around')

subMenuEl.style.position = 'absolute';

subMenuEl.style.bottom = '0';


//PART 2 Step 4 Adding Menu Interaction
const topMenuLinks = [];
function buildSubmenu(subLinks) {
    subMenuEl.innerHTML = ""; // Clear existing submenu

    subLinks.forEach(link => {
        const anchor = document.createElement("a");
        anchor.href = link.href;
        anchor.textContent = link.text;
        subMenuEl.appendChild(anchor);
    });
}

topMenuEl.addEventListener("click", function(event) {
    event.preventDefault();

    if (event.target.tagName !== "A") return;

    // Remove "active" class from all links
    document.querySelectorAll("#topMenuEl a").forEach(link => {
        link.classList.remove("active");
    });
//PART 2 Step 5 Adding Menu Interaction

    // Cache the clicked link object from menuLinks
    const clickedLink = menuLinks.find(link => link.text === event.target.textContent);

    // Toggle "active" class and submenu visibility
    if (event.target.classList.contains("active")) {
        event.target.classList.remove("active");
        subMenuEl.style.top = "0"; // Hide submenu
    } else {
        event.target.classList.add("active");

        if (clickedLink.subLinks) {
            subMenuEl.style.top = "100%";
            buildSubmenu(clickedLink.subLinks); // Call the helper function
        } else {
            subMenuEl.style.top = "0";
        }

        // Show submenu only if subLinks exist (ABOUT should not trigger it)
        subMenuEl.style.top = clickedLink.subLinks ? "100%" : "0";
    }
});

subMenuEl.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default behavior

    if (event.target.tagName !== "A") return; // Ensure it's an <a> tag

    console.log(event.target.textContent); // Log clicked link content

    subMenuEl.style.top = "0"; // Hide submenu after click

    // Remove "active" class from top menu links
    document.querySelectorAll("#topMenuEl a").forEach(link => {
        link.classList.remove("active");
    });

    // Update the <h1> inside mainEl with the clicked submenu text
    const mainEl = document.querySelector("main h1");
    mainEl.textContent = event.target.textContent === "about" ? "About" : event.target.textContent;
});