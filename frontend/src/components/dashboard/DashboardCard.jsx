export default function DashboardCard() {

const cards=[

{
title:"Revenue",
value:"₹18.4 Lakh",
change:"+12%"
},

{
title:"Clients",
value:"148",
change:"+6"
},

{
title:"Pending Tasks",
value:"23",
change:"Today"
},

{
title:"AI Score",
value:"98%",
change:"Excellent"
}

];

return(

<div className="card-grid">

{cards.map(card=>(

<div className="dashboard-card">

<h3>{card.title}</h3>

<h1>{card.value}</h1>

<p>{card.change}</p>

</div>

))}

</div>

)

}