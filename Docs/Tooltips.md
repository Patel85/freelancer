  <!-- Dashboard barGraph tooltip for totalminutes as value  -->

updateTooltipData={(tooltipData, colors) => {
let hours = (+tooltipData.value / 60)
.toFixed(2)
.split(".")[0];
let minutes = +tooltipData.value % 60;
return (
<div style={{ color: "black" }}>
{hours !== "0" && (
<>
<strong style={{ color: colors(tooltipData.key) }}>
{hours}&nbsp;
</strong>
hours&nbsp;
</>
)}
<strong style={{ color: colors(tooltipData.key) }}>
{minutes.toFixed(2).split(".")[0]}&nbsp;
</strong>
minutes
</div>
);
}}
