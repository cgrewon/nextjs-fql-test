import React from "react";
import { useMutation, gql } from "@apollo/client";
import { Input, TextField, Button } from "@mui/material";
import { useEvent } from "../context/EventContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";



const createQuery = gql`
  mutation createEvent($title: String!, $time: DateTime!, $value: Int!) {
    createEvent(input: { title: $title, created_at: $time, value: $value }) {
      id
      title
      value
      created_at
    }
  }
`;

export default function AddEventForm() {
  const router = useRouter();

  const { refetch } = useEvent();
  const [createEvent, { data, loading, error }] = useMutation(createQuery);

  const [title, setTitle] = React.useState<string>("");
  const [value, setValue] = React.useState<number>();

  if (error)
    return <div className="text-white">Submission error! {error.message}</div>;

  const onSubmit = (e: any) => {
    e.preventDefault();
    createEvent({
      variables: { title, time: new Date(), value },
    }).then((result) => {
      console.log("create result: ", result);
      if (refetch) {
        refetch();
      }
      router.replace("/");
    });
  };

  const onBack = () => {
    router.back();
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", marginTop: 'calc(50vh - 250px)' }}>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-12">
            <TextField
              className="m-2 w-100"
              required
              id="title-text"
              variant="standard"
              label="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title..."
            />
          </div>
          <div className="col-md-12">
            <TextField
              required
              id="value-text"
              className="m-2  w-100"
              variant="standard"
              label="Value"
              type="number"
              value={value}
              onChange={(e) => setValue(+e.target.value)}
              placeholder="Enter value..."
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <Button
              variant="outlined"
              size="large"
              disabled={loading}
              onClick={onBack}
            >
              Back
            </Button>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
            <Button
              variant="contained"
              type="submit"
              size="large"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress color="success" size={27} />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
