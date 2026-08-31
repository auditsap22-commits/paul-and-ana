import {
  proposalRoleDefinitions,
  proposalRoleIdAliases,
} from "@/content/proposal-roles"

export const siteConfig = {
  couple: {
    bride: "Ana Margarita Benigno", //Noenyl Bryle M. Gonzaga
    brideNickname: "Ana", //Ltryl
    groom: "Marion Paul Serrano", //Ltryl B. Benitez
    groomNickname: "Paul",
    monogram:"/monogram/new-monogram.png" ,//Ltryl
    backgroundMusic:"/background_music/Mike Mains & The Branches - I Love You Always Forever (Lyric Video).mp3"
  },
  googleAPI:{
    messageForm: "https://docs.google.com/forms/d/e/1FAIpQLSdKkO4fsBXegi8lri4F0wR9tahjz3XvmkiOeaYogtKE4rFvOA/formResponse",   //done
    message: "https://script.google.com/macros/s/AKfycbzV64hOYoC6ldCagtU6shw7OVYsyU-tKwZCDx5Cxm0Ms_AlNx1eQUUP35I5bIT_gx7j/exec",  //done
    guestList: "https://script.google.com/macros/s/AKfycbwdzDK7zzMF_e_Zp8mefJ6OgTUnYM0nyCkte5jxmkiU_C2fAi-GM_hzgR3SF40DsN5F/exec",  //done
    guestRequest: "https://script.google.com/macros/s/AKfycbxswedD8ytGA-FrJee3WcmUFj83oZw9b3sJt6TfHw-IMhzVQvWQv_y_-mbQoI8uxLrg/exec",   //done
    entourage: "https://script.google.com/macros/s/AKfycbyeTZKoveZ4oK6MWlD9HRrkVRd_0fd10_WcHPz3pEcMKj836zfh2BB6gAWtnddns5BO/exec",  //done
    sponsors: "https://script.google.com/macros/s/AKfycbwA7u4bbtmWdYuS-VKNL3vrZdiCnf0s3anp5LS7AgKdWygCvjX_rdqbtKxcUBHpgQP1/exec",  //done 
    proposalResponses: "https://script.google.com/macros/s/AKfycbwIUDKMoMIHVwbmr6KbgmBtlGRpMGj1Z9maeHSEwsFaXNi0dAH8WYhqbtiAfg_p5D4lgw/exec", // uses entourage script with action: proposal
    weddingDetails: "https://script.google.com/macros/s/AKfycbx7sz1e2uoVjfrSOGuHXwHSbM7Fa4b6_vyMFnBXaZogdw1QzfxIvqrLbQPvoJIsxl7_/exec",   //done
////google share 
    googleShare: "https://docs.google.com/spreadsheets/d/1J7mR98rWgWTUuyznyH2KFltoE2U5n4JrAcf-cVXbqsQ/edit?usp=sharing", 
  },
  wedding: {
    date: "November 6, 2026",
    time: "9:00 AM",
    venue: "St. Benedict Parish",
    tagline: "are getting married!!!!!",
    theme: "Our wedding palette is inspired by timeless elegance and warmth.Motif Colors: Champagne Gold, Soft Beige, Warm Soft Brown",
    motif: "#BBCED5, #B9C3A8, #F3D8C5, #D1C4D4, #ECD8BA, #F4E8D8, #E1DCCF",
  },
  proposal: {
    // Use "Maid of Honor" for unmarried, "Matron of Honor" for married
    honorAttendant: "Matron of Honor" as "Matron of Honor" | "Maid of Honor",
    roles: proposalRoleDefinitions,
    roleIdAliases: proposalRoleIdAliases,
  },
  details: {
    rsvp: {
      deadline: "October 6, 2026",
      coordinator: "Ana / Paul",
      phone: "to be announced",
    },
  },
  contact: {
    bridePhone: "to be announced",
    groomPhone: "to be announced",
    email: "to be announced",
  },
  giftRegistry: {
    QR_1:{
    id: "BPI",
    src: "/QR/BPI.png",
    label: "BPI",
    accountNumber: "KAMS : ***********569",
    },
    QR_2:{
    id: "MariBank",
    src: "/QR/MariBank.png",
    label: "MariBank",
    accountNumber: "****7672",
    }
    // ,
    // QR_3:{
    // id: "Gcash",
    // src: "/QR/pleaseProvideQR.png",
    // label: "Gcash",
    // accountNumber: "to be announced",
    // }
  },
  ceremony: {
    location: "St. Benedict Parish",
    venue: "Ayala Westgrove Heights, South Blvd, Silang, 4118 Cavite, Philippines",
    map: "https://maps.app.goo.gl/yRMLmsfaZwjEWzy36",
    date: "November 6, 2026",
    day: "Friday",
    time: "9:00 AM",
    entourageTime: "8:00 AM",
    guestsTime: "8:30 AM",
    image: ["/Details/ceremony.png", "/Details/ceremony2.png","/Details/ceremony3.png"],
  },
  reception: {
    location: "Jardin de Milagros Events Place",
    venue: "Purok 1, 9981 Santa Rosa. Tagaytay Rd, Silang, 4118 Cavite, Philippines",
    map: "https://maps.app.goo.gl/EbRsPP7DbNo2bJ1k8",
    date: "November 6, 2026",
    day: "Friday",
    time: "12:00 PM",
    image: ["/Details/reception.png", "/Details/reception1.png","/Details/reception3.png"],
  },
  dressCode: {
    theme: "STRICTLY FORMAL",
    sponsors: {
      title: "Sponsors",
      ninang: {
        label: "Ninang",
        description: "Long gown in the shade of silver gray.",
        image: "/Details/Ninang.png",
        palette: ["#D8D3CD", "#C0C0C0", "#A9A9A9", "#969090", "#8C8686"],
      },
      ninong: {
        label: "Ninong",
        description: "Barong Tagalog and black slacks.",
        image: "/Details/Ninong.png",
        palette: ["#D0A386", "#E3C5B3", "#E4DCD1"],
      },
    },
    entourage: {
      title: "Entourage",
      bridesmaid: {
        label: "Bridesmaids",
        description: "Long gown that suits our color motif.",
        image: "/Details/bridesmaid.png",
        palette: ["#B4A3D4", "#C8A2C8"],
      },
      groomsmen: {
        label: "Groomsmen",
        description: "Long sleeve Barong Tagalog and black slacks.",
        image: "/Details/Groomsmen.png",
        palette: ["#D0A386", "#E3C5B3", "#E4DCD1"],
      },
    },
    guests: {
      title: "Guests",
      label: "Guests",
      description: "Formal attire and formal dress.",
      image: "/Details/guest.png",
      palette: ["#D9B8F5", "#A37CD2", "#E6DDD2", "#E4C5B2", "#727E40"],
    },
    paletteNote:
      "To create a cohesive and elegant celebration, we kindly encourage our guests to follow the suggested color palette above. To allow our wedding party to be easily distinguished, we respectfully ask that guests refrain from wearing white or black, as these colors are reserved for the couple and the wedding party.",
    closing:
      "Thank you for helping us bring our wedding vision to life. We can't wait to celebrate with you!",
    note: "We kindly request our guests to dress in attire following our wedding palette.",
  },
  narratives: {
    ourStory: `Once upon a signature…

Our story began with a simple signature, one that slowly turned into something magical. He was my financial advisor, and I was there to sign documents. It was July 5, 2021, and we met at the Lobby of the building. Little did we know, that ordinary day would start a story neither of us expected.

I wasn't looking for anything, yet somehow, our connection grew in its own gentle, unexpected way. And then, on June 1, 2022, our story truly began—we became us. We found a love that feels like home.

Our journey wasn't rushed, but perfectly timed. We believe that God brought us together in His own way and season.

With hearts full of gratitude, we step into this new chapter hand in hand, trusting His plan and celebrating a love rooted in faith, patience, and grace.

Today, we choose each other- again and again- and we can't wait to celebrate this new chapter with the people we love most.`,
    groom: `The first time Mark saw Catherine, time seemed to slow down. It was an ordinary day that instantly became unforgettable: one smile, one hello, and suddenly his world had a new center. He didn't have the perfect words ready, but he knew he had met someone who felt like home.

Early conversations turned into late-night talks, sharing dreams, favorite meals, and whispered prayers for a future together. With every small adventure—coffee runs, long drives, quiet walks—Mark found himself choosing her over and over again. He loved how she laughed freely, how she listened with her whole heart, and how her faith steadied him.

There were seasons of distance and long workdays, but every reunion reminded him why he stayed patient: because Catherine was worth every mile and every minute apart. When he finally knelt to ask for her hand, it wasn't a question of "if," only "when can we start forever?"`,
    bride: `Catherine remembers the first time Mark said her name. It was gentle but sure, a kindness that made her feel both seen and safe. In that softness, she found a partner who met her with the same grace she prayed to give.

Mark's steadiness won her heart: the way he showed up, even when schedules were tight, and how he always found lightness in the small things. He celebrated her wins, held space for her worries, and never hesitated to choose "us" in every decision.

Now, as they prepare to say yes before God and the people they love most, Catherine is grateful for the patience, humor, and hope Mark brings to every day. She knows this next chapter is just the start of the love story they get to write together.`,
  },
  colors: {
    primary: "#87AE73",
    secondary: "#F5F5DC",
  },
  playlist: {
    title: "A Playlist from our hearts",
    subtitle: "Songs that have been part of our journey together",
    playlistName: "Paul and Ana Wedding",
    embedUrl:
    //https://open.spotify.com/embed/playlist/2AhKS56CXqBWMYYNrnWrsR?utm_source=generator&si=2beaa29421e94943
      "https://open.spotify.com/embed/playlist/2AhKS56CXqBWMYYNrnWrsR?utm_source=generator&theme=0&si=2beaa29421e94943",
    spotifyUrl: "https://open.spotify.com/playlist/2AhKS56CXqBWMYYNrnWrsR",
  },
  snapShare: {
    googleDriveLink:
      "https://drive.google.com/drive/folders/1BE5gjldtokJI4ba5narJmLgzIkXhfrA_?usp=sharing",
    albumQR: "/QR/AlbumQR.png",
    hashtag: ["#PaulandAnaWedding"],
    instructions: "Please scan this QR Code and upload the photos and videos you have taken during our wedding reception. We are delighted to see your snaps too!",
  },
  accommodation: {
    coordinator: {
      name: "Paul / Ana",
      phone: "to be announced",
    },
    hotels: [
      {
        name: "La Luna Resort",
        discount: "Offered 20% discount for early booking",
        facebook: "https://www.facebook.com/lalunabeachresortofficial",
      },
      {
        name: "GOSAM Beach Resort",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100083461714073",
      },
      {
        name: "Calicoan Villa",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/CalicoanVilla",
      },
      {
        name: "G Camp Beachfront",
        discount: "Offered 10% discount",
        facebook: "https://www.facebook.com/profile.php?id=100085772194096",
      },
      {
        name: "Punta Viajero Beach Resort",
        discount: "Offered 15% discount",
        phone: "0932 214 6408",
        facebook: "https://www.facebook.com/puntoviajeroresort",
      },
      { name: "Balay Sunset" },
      { name: "Balay Pacifico" },
      { name: "Casa Nala" },
      { name: "The Grey Inn" },
    ],
    carRentals: [
      {
        name: "Apex Car Rental Tacloban",
        facebook: "https://www.facebook.com/profile.php?id=61574882327115",
      },
      {
        name: "Cassey Wheels Car Rental",
        facebook: "https://www.facebook.com/search/top?q=casseywheels%20car%20rental",
      },
    ],
  },
}
