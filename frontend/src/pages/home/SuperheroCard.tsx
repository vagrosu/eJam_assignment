import { Divider, Rating } from "@mui/material";
import { SuperheroType } from "./types";
import { AspectRatio, Card, CardContent, Typography } from "@mui/joy";

type SuperheroCardProps = {
  superhero: SuperheroType;
};

export default function SuperheroCard({ superhero }: SuperheroCardProps) {
  return (
    <Card
      variant="solid"
      sx={{
        "display": "flex",
        "flexDirection": "column",
        "justifyContent": "space-between",
        "transition": "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        },
      }}
    >
      <div style={{ padding: "8px" }}>
        <Typography level="title-lg" textColor="white">
          {superhero.name}
        </Typography>
        <Typography textColor="white">{superhero.superpower}</Typography>
      </div>
      <AspectRatio minHeight="150px" maxHeight="250px">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/004/842/450/small_2x/superhero-standing-with-hands-on-hips-silhouette-free-vector.jpg"
          loading="lazy"
          alt="Superhero"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </AspectRatio>
      <CardContent orientation="vertical" sx={{ padding: "8px" }}>
        <Divider>
          <Typography level="body-xs" marginBlock="auto" textColor="white">
            Humility
          </Typography>
        </Divider>
        <Rating name="half-rating" value={superhero.humilityScore} precision={1} max={10} size="small" />
      </CardContent>
    </Card>
  );
}
