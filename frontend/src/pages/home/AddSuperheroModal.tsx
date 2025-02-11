import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddSuperheroModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [humilityScore, setHumilityScore] = useState<number | "">("");
  const [errorField, setErrorField] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["addSuperhero"],
    mutationFn: async (newSuperhero: { name: string; superpower: string; humilityScore: number }) => {
      return axios.post("http://localhost:3000/v1/superheroes", newSuperhero).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["superheroes"]);
      toast.success("Superhero added successfully!");
      toggle();
    },
    onError: (err: any) => {
      if (err?.response?.data) {
        if (err.response.data.errors) {
          setErrorField(err.response.data.errors[0].field);
          toast.error(err.response.data?.errors[0].message);
        } else {
          toast.error(err.response.data?.message);
        }

        return;
      }

      toast.error("An error occurred. Please try again later.");
    },
  });

  useEffect(() => {
    setErrorField(null);
  }, [name, superpower, humilityScore]);

  const toggle = () => {
    setName("");
    setSuperpower("");
    setHumilityScore("");
    setErrorField(null);
    setOpen((prev) => !prev);
  };

  const handleSubmit = () => {
    if (typeof humilityScore !== "number") {
      toast.error("Humility Score must be a number");
      return;
    }

    mutate({ name, superpower, humilityScore });
  };

  return (
    <>
      <Button onClick={toggle} variant="contained" color="primary">
        Add Superhero
      </Button>
      <Dialog open={open} onClose={toggle} fullWidth maxWidth="sm">
        <DialogTitle>Add New Superhero</DialogTitle>
        <DialogContent dividers>
          <TextField
            margin="normal"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errorField === "name"}
          />
          <TextField
            margin="normal"
            label="Superpower"
            fullWidth
            value={superpower}
            onChange={(e) => {
              setSuperpower(e.target.value);
            }}
            error={errorField === "superpower"}
          />
          <TextField
            margin="normal"
            label="Humility Score"
            type="number"
            fullWidth
            value={humilityScore}
            onChange={(e) => setHumilityScore(e.target.value === "" ? "" : Number(e.target.value))}
            error={errorField === "humilityScore"}
            inputProps={{ min: 0, max: 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle} color="info">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Superhero
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
