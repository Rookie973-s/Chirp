import T from '../tokens';

const DEPTS = [
  {name:"Computing",color:"#6366F1",count:"1.2k"},
  {name:"Engineering",color:"#3B82F6",count:"842"},
  {name:"Sciences",color:"#10B981",count:"654"},
  {name:"Medicine",color:"#EF4444",count:"412"},
  {name:"Management",color:"#8B5CF6",count:"398"},
  {name:"Law",color:"#F59E0B",count:"210"},
  {name:"Education",color:"#EC4899",count:"195"},
  {name:"Agriculture",color:"#84CC16",count:"178"},
  {name:"Campus Life",color:"#14B8A6",count:"890"},
];

const QUESTIONS = [
  {id:1,user:"Mohammed Kabir",dept:"Mechanical Engineering",time:"2h ago",av:"MK",bg:"#3B82F6",staff:false,answered:true,
   title:"What's the best strategy for MTH201 exams?",
   body:"I'm in 200L and heard the MTH201 lecturer is very strict. Are there specific past questions or textbooks that align perfectly with his teaching style? I've tried PastQ app but couldn't find anything recent.",
   tags:["Engineering","Academics","Exams"],likes:24,ans:5,views:142,liked:false,votes:47,voted:null,saved:false},
  {id:2,user:"Dr. Sarah Ibrahim",dept:"Computer Science",time:"5h ago",av:"SI",bg:"#8B5CF6",staff:true,answered:false,
   title:"Announcement: CSC411 Mini-Project Submission Extended",
   body:"The final submission date for all CSC411 hardware projects has been extended to Friday next week. Ensure documentation follows IEEE format. Viva voce will still hold as scheduled on Wednesday.",
   tags:["Computing","Announcement","Deadline"],likes:89,ans:12,views:450,liked:true,votes:134,voted:"up",saved:true},
  {id:3,user:"David Ojo",dept:"Medicine & Surgery",time:"1d ago",av:"DO",bg:"#EF4444",staff:false,answered:true,
   title:"Hostel accommodation portal showing 'Allocation Closed'?",
   body:"The portal is showing 'Allocation Closed' but I was told Batch B starts today. Has anyone successfully booked a bed space in Yelwa campus today? Is there an alternative approach?",
   tags:["Campus Life","Hostel","Portal"],likes:15,ans:8,views:210,liked:false,votes:22,voted:null,saved:false},
  {id:4,user:"Fatima Aliyu",dept:"Law",time:"3d ago",av:"FA",bg:"#F59E0B",staff:false,answered:true,
   title:"Is the ATBU law faculty recognised by the NBA?",
   body:"I want to make sure the Faculty of Law is fully accredited by the Nigerian Bar Association before finalising my admission. Anyone with first-hand knowledge?",
   tags:["Law","Accreditation","Admission"],likes:32,ans:10,views:378,liked:false,votes:59,voted:null,saved:false},
  {id:5,user:"Prof. Adamu Garba",dept:"Agriculture",time:"5d ago",av:"AG",bg:"#84CC16",staff:true,answered:false,
   title:"Research opportunity: Student call-for-collaboration on dryland farming",
   body:"I am inviting motivated 300L & 400L students from the Faculty of Agriculture for a 6-month dryland irrigation research project. Stipend available. Interested students should report to my office.",
   tags:["Agriculture","Research","Opportunity"],likes:61,ans:3,views:520,liked:false,votes:98,voted:null,saved:false},
];

const STAFF = [
  {id:1,name:"Prof. A. T. Garba",role:"HOD, Computer Science",dept:"Computing",av:"AG",bg:"#6366F1",online:true,email:"a.garba@atbu.edu.ng",phone:"+234 803 xxx xxxx",bio:"Professor of Software Engineering with 20+ years experience. Research interests: AI, distributed systems.",rating:4.8,answers:142},
  {id:2,name:"Dr. Sarah Ibrahim",role:"Senior Lecturer",dept:"Computing",av:"SI",bg:"#8B5CF6",online:false,email:"s.ibrahim@atbu.edu.ng",phone:"+234 806 xxx xxxx",bio:"Specialises in Embedded Systems and IoT. Supervises final year projects in hardware-software integration.",rating:4.6,answers:98},
  {id:3,name:"Engr. M. Kabir",role:"Lecturer I",dept:"Engineering",av:"MK",bg:"#3B82F6",online:true,email:"m.kabir@atbu.edu.ng",phone:"+234 812 xxx xxxx",bio:"Mechanical Engineering specialist with expertise in Thermodynamics and Fluid Mechanics.",rating:4.5,answers:77},
  {id:4,name:"Dr. F. Ojo",role:"Associate Professor",dept:"Medicine",av:"FO",bg:"#EF4444",online:true,email:"f.ojo@atbu.edu.ng",phone:"+234 809 xxx xxxx",bio:"Consultant Surgeon and academic. Coordinates MBBS clinical rotations at ATBU Teaching Hospital.",rating:4.9,answers:203},
  {id:5,name:"Mr. Usman Ali",role:"Lab Technologist",dept:"Engineering",av:"UA",bg:"#F59E0B",online:false,email:"u.ali@atbu.edu.ng",phone:"+234 813 xxx xxxx",bio:"Maintains all engineering laboratory equipment. Assists students with practical sessions.",rating:4.3,answers:45},
  {id:6,name:"Mrs. H. Bello",role:"Lecturer II",dept:"Management",av:"HB",bg:"#EC4899",online:true,email:"h.bello@atbu.edu.ng",phone:"+234 817 xxx xxxx",bio:"Specialist in Entrepreneurship and Business Administration. Coordinator of the ATBU Business Incubator.",rating:4.7,answers:112},
  {id:7,name:"Prof. I. Danladi",role:"Dean, Faculty of Law",dept:"Law",av:"ID",bg:"#F59E0B",online:true,email:"i.danladi@atbu.edu.ng",phone:"+234 802 xxx xxxx",bio:"Senior Advocate of Nigeria (SAN). Dean of Law with 30 years at the bar and bench.",rating:5.0,answers:88},
  {id:8,name:"Dr. Miriam Sule",role:"Lecturer",dept:"Sciences",av:"MS",bg:"#10B981",online:false,email:"m.sule@atbu.edu.ng",phone:"+234 805 xxx xxxx",bio:"Biochemist specialising in natural products research. Coordinator of the undergraduate thesis programme.",rating:4.4,answers:67},
];

const TRENDING = [
  {n:1,q:"When is the matriculation date for freshers?",m:"Campus Life · 84 answers"},
  {n:2,q:"Result for GST111 is out — check portal now",m:"General · 120 answers"},
  {n:3,q:"How to bypass the portal clearance error",m:"Academics · 45 answers"},
  {n:4,q:"Computing department laptop requirement list",m:"Computing · 58 answers"},
];

const NOTIFS = [
  {type:"comment",text:"<strong>Dr. Sarah</strong> answered your question on MTH201.",time:"2m ago",unread:true},
  {type:"like",text:"<strong>David Ojo</strong> upvoted your comment.",time:"1h ago",unread:true},
  {type:"comment",text:"New announcement in <strong>Computer Science</strong>.",time:"1d ago",unread:false},
];

const MEDIA_POSTS = [
  {id:1,user:"David Ojo",av:"DO",bg:"#EF4444",time:"1h ago",type:"image",thumb:"https://images.unsplash.com/photo-1562774053-701939374585?w=400&q=80",caption:"ATBU Engineering block looking great this morning!",likes:48,comments:7},
  {id:2,user:"Fatima Aliyu",av:"FA",bg:"#F59E0B",time:"3h ago",type:"image",thumb:"https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",caption:"Graduation ceremony — Class of 2025!",likes:134,comments:22},
  {id:3,user:"Mohammed Kabir",av:"MK",bg:"#3B82F6",time:"5h ago",type:"video",thumb:"https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&q=80",caption:"Study session in the library — who else is cramming for MTH201?",likes:29,comments:11},
  {id:4,user:"Dr. Sarah Ibrahim",av:"SI",bg:"#8B5CF6",time:"1d ago",type:"image",thumb:"https://images.unsplash.com/photo-1581362716668-5c8b2c5a3c56?w=400&q=80",caption:"Department lab equipment upgrade — new hardware for CSC411 practicals.",likes:91,comments:34},
  {id:5,user:"Prof. Adamu Garba",av:"AG",bg:"#84CC16",time:"2d ago",type:"image",thumb:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",caption:"Research team presenting at the dryland farming conference.",likes:76,comments:18},
  {id:6,user:"Amina Yusuf",av:"AY",bg:"#EC4899",time:"3d ago",type:"video",thumb:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",caption:"Group project done! Shoutout to the whole Computing 300L team.",likes:203,comments:41},
];

export const feedCatItems = [
  {key:"All",label:"All Questions",name:"All Questions",color:T.gold,count:"3.2k"},
  ...DEPTS.map(d=>({...d,key:d.name}))
];

export const staffCatItems = [
  {key:"All",label:"All Departments",name:"All",color:T.gold},
  ...DEPTS.map(d=>({...d,key:d.name}))
];

export { DEPTS, QUESTIONS, STAFF, TRENDING, NOTIFS, MEDIA_POSTS };