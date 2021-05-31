const news = [
  {
    id: 1,
    title: "One Man’s Fight for the Right to Repair Broken MacBooks",
    subtitle: "He started as just 'a random person ranting at a camera for therapy.'",
    author: "Kayla Steinberg",
    time: 1621823085000,
    content: `
SyntaxHighlighter by highlight.js:
\`\`\` js
function initHighlight(block, cls) {
  try {
    if (cls.search(/\\bno\\-highlight\\b/) != -1)
      return process(block, true, 0x0F) +
              \` class="\${cls}"\`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }
}
\`\`\`

Mathematical Formula by Katex:

$$\\begin{array}{c}
\\nabla \\times \\vec{\\mathbf{B}} -\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{E}}}{\\partial t} &
= \\frac{4\\pi}{c}\\vec{\\mathbf{j}}    \\nabla \\cdot \\vec{\\mathbf{E}} & = 4 \\pi \\rho \\
\\nabla \\times \\vec{\\mathbf{E}}\\, +\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{B}}}{\\partial t} & = \\vec{\\mathbf{0}} \\
\\nabla \\cdot \\vec{\\mathbf{B}} & = 0
\\end{array}$$

More JavaScript code example
\`\`\`
function fetchAndDecode(url) {
  return fetch(url).then(response => {
    if(!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    } else {
      return response.blob();
    }
  })
}

let coffee = fetchAndDecode('coffee.jpg');
let tea = fetchAndDecode('tea.jpg');

Promise.any([coffee, tea]).then(value => {
  let objectURL = URL.createObjectURL(value);
  let image = document.createElement('img');
  image.src = objectURL;
  document.body.appendChild(image);
})
.catch(e => {
  console.log(e.message);
});
\`\`\`

In this example, we have a function that fetches an image and returns a blob. We use Promise.any() to fetch a couple of images and display the first one available (i.e. whose promise has resolved).
`,
    type: "",
  },
  {
    id: 2,
    title: "Which Android 12 feature do you want Apple to copy for iOS 15?",
    subtitle: "Last week, Google unveiled during its new Android 12 operating system at its Google I/O conference. With the iOS 15 announcement around the corner at WWDC next month, which features of Android 12 would you like Apple to copy?",
    author: "José Adorno",
    time: 1616036312000,
    content: `
For months, Rep. Liz Cheney (R-Wyo.) has decried former president Donald Trump’s false claims of massive election fraud — a stance that cost her a leadership position in the House earlier this month.

But when pressed on Sunday about whether Trump’s falsehoods were the cause of Republican moves to pass restrictive new voting laws in dozens of states, Cheney disputed the suggestion.

“I think you have to look at the specifics of each one of those efforts,” Cheney said on “Axios on HBO,” arguing that some of the bills had been misrepresented.

## New UI with Material You

Android is receiving its biggest UI update ever with Material You. With the “Deeply personal” tentpole, this version is extremely configurable.

For example, when you choose a wallpaper, Android 12 will extract colors and determine which hues are dominant and complementary. 

These colors are then applied across the notification shade, Lock Screen, volume controls, new widgets, and many other parts of the OS.

## Revamped Widget system

Widgets have been a part of Android for a long time. Although Apple took a while to introduce them, it was only on iOS 14 users were finally able to add a widget into the Home Screen. Widgets on iOS 14 looks great, but there are a few limitations, you can’t just place them anywhere you like.

With Android 12, widgets are now bigger and bubblier with a playful design. For example, the you move a widget around on your wallpaper, it subtly changes its background color to be closer to the parte of the image it’s set upon.

## Control Center and Privacy Dashboard

The new Control Center has rounded toggles, which are easier to view and access. With the Privacy Dashboard feature, it’s handier to manage in one place all your apps permissions. While Apple already shows which apps use what, Google introduced an improved version of it, with easy toggles to disable apps access to the camera and microphone.

Instead of going every time to Settings, with Android 12, you can able/disable app access from the Control Center.

## What else is new on Android 12?

Although Apple could learn a thing or two with Android 12, it’s true that this update is bringing some features Apple devices have had for a long time. For example, Android 12 will finally have a built-in remote that will work with Android TV systems.

For Chromebook users, Google is working to create a better flow between Android devices and Chrome OS, but the company didn’t develop anything closer to AirDrop.

Updates are also a bit tricky for Android users. Since every manufacturer creates its custom UI and carriers add a lot of stuff on Android as well, users usually take a long time to update their phones to the latest versions of Android. To learn more about Android 12, head over 9to5Google here.

Which of Android 12 features above do you think Apple should copy for iOS 15 and why? Vote and tell us in the comment section below.
`,
    type: ""
  },
  {
    id: 3,
    title: "'More comfortable than AirPods': These wildly popular wireless earbuds are on sale for just $15 at Amazon",
    subtitle: "Yahoo Life is committed to finding you the best products at the best prices. We may receive a share from purchases made via links on this page. Pricing and availability are subject to change.",
    author: "Rudie Obias",
    time: 1621506199000,
    content: `
Don’t want to splurge on the Apple AirPods or the Samsung Galaxy Buds? We hear you. While both those models deliver premium audio and top-notch design, they cost upwards of $100. Thankfully, we stumbled upon a pair of top-rated wireless earbuds for a fraction of that ...with features that even AirPods and Galaxy Buds don’t have!

Enter the Edyell Wireless Earbuds, a wallet-friendly pair with impressive audio quality and deep, satisfying bass. And here’s the best part: They’re on sale for just $15 with on-page coupon, down from $28. That’s nearly half off!

And if you have Amazon Prime, you’ll get free shipping, of course. Not yet a member? No worries; you can sign up for a free 30-day trial here. (And by the way, those without Prime still get free shipping on orders of $25 or more.)

The Edyell Wireless Earbuds offer up to 120 hours of playtime with their included charging case. To put a finer point on it: You can get over 25 charges before you have to plug them in again! And how's this for a twist? That same charging case can also be used as a power bank for other devices — you can charge your smartphone or tablet with it via USB. Now that’s something Apple AirPods just can’t do.`,
    type: ""
  },
  {
    id: 4,
    title: "Original Xbox Dashboard Easter Egg Discovered After 20 Years",
    subtitle: "As reported by website Kotaku, an anonymous developer of the original Xbox leaks the steps to trigger an undiscovered dashboard Easter Egg.",
    author: "Caleb Greer",
    time: 1621913668000,
    content: `
A new Easter Egg has been discovered in the original Xbox's dashboard, nearly twenty years after the console's initial release. Microsoft's first Xbox, which launched back in November 2001, is known to contain many hidden secrets within its operating system.

Indeed, one such secret in the Xbox dashboard was discovered years ago. To initiate that Easter Egg, a player must press "Music" from the main menu and insert an audio CD. From the "Audio CD" menu, the player presses "Copy" before selecting "Copy" once again on the next screen. The player then selects "New Soundtrack." If everything is done correctly, a keyboard should come up with a space to name the soundtrack. Spelling out "<<Eggsβox>>" and selecting "Done" activates a credits screen that thanks the development team and lists the original Xbox developers.

The existence of the latest Easter Egg, as well as the steps needed to activate it, were leaked by an anonymous source to website Kotaku, who verified the source as an original Xbox developer. Reporter Alexandra Hall inquired as to why the source decided to leak this information now. Aside from believing that the Easter Egg would never be found since it hadn't been discovered in twenty years, the source said, "I also thought if I didn’t do it now it would never likely happen. It had been so long I couldn’t even remember the trigger!" The source had to verify that they still knew the trigger by trying out "several things" on their Xbox to be certain. Kotaku's video on how to activate the Easter Egg can be viewed below.

The steps to activate the new Easter Egg are very similar to the steps required to activate the older Easter Egg described earlier. Both are triggered by going through the process to rip a CD and entering a specific series of characters into the field. Therefore, players need only follow the steps outlined earlier to reach the "New Soundtrack" naming screen. From there, the phrase and obvious South Park reference "Timmyyyyyyyyyyyyyyyyyyyyyyyyyy!" must be entered in the field (it has twenty-six "y"s). Press "Done," wait for the CD to rip, then navigate back to the main menu. If the player then selects "Settings," scrolls down, and chooses "System Info," the text there will have changed to display the four names of the original Xbox Dashboard Team: Victor Blanco, Sakphong Chanbai, Bradford Christian, and Jim Helm.`,
    type: ""
  },
  {
    id: 5,
    title: "'xQc Rumored to Be Banned Permanently From GTA RP NoPixel Server",
    subtitle: "Twitch streamer Felix \"xQc\" Lengyel is no stranger to having been banned from the popular Grand Theft Auto roleplay NoPixel server over the past few months. ",
    author: "Rudie Obias",
    time: 1621990018000,
    content: `
According to a social media account that follows xQc, the streamer has now been banned once again from GTA RP NoPixel. Unlike previous instances, however, this new ban is said to be a permanent one, meaning that xQc might not get a chance to appeal and come back in the future as he has before. The reason for this belief of another ban comes from a number of forum posts and the server's official Discord, both of which point to the ban. The forum, in particular, notes that xQc's full username--which is xQcOW--has joined the "permanently banned" list.

As of this writing, xQc himself and those in charge of the GTA RP server haven't commented on whether or not this is legitimate. Because of this, it's worth taking all of this information with a grain of salt. Even though xQc has been banned in the past (and as such, it honestly wouldn't be shocking to see happen once again) there's nothing that has emerged publicly to verify this as true. That being said, with this story continuing to get bigger, there's a good chance that we should find out officially whether or not this is legitimate within the near future.

So what do you think about all of this? Do you think xQc has found himself banned from NoPixel once again? And if so, what do you think caused the ban? Let me know all of your own thoughts either down in the comments or over on Twitter at @MooreMan12.
`,
    type: ""
  },
  {
    id: 6,
    title: "'xQc Rumored to Be Banned Permanently From GTA RP NoPixel Server",
    subtitle: "Twitch streamer Felix \"xQc\" Lengyel is no stranger to having been banned from the popular Grand Theft Auto roleplay NoPixel server over the past few months. ",
    author: "Rudie Obias",
    time: 1621990018000,
    content: "",
    type: ""
  }
]

export default news;