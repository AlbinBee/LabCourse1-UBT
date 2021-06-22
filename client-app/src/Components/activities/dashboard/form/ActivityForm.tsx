import React, { FormEvent, useState } from "react";
import { Button, Container, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../../app/models/activity";
import { v4 as uuid } from 'uuid';

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initalFormState,
  createActivity,
  editActivity,
  submitting
}) => {
  const initializeForm = () => {
    if (initalFormState) {
      return initalFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: "",
        attendees: []
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  }

  const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Container >
      <Segment clearing>
        <Form onSubmit={handleSubmit}>
          <label htmlFor="Title">Title</label>
          <Form.Input
            onChange={handleInputChange}
            name="title"
            placeholder="Title"
            value={activity.title}
          />
          <label htmlFor="Description">Description</label>
          <Form.TextArea
            onChange={handleInputChange}
            name="description"
            rows={2}
            placeholder="Description"
            value={activity.description}
          />
          <label htmlFor="Category">Category</label>
          <Form.Input
            onChange={handleInputChange}
            name="category"
            placeholder="Category"
            value={activity.category}
          />
          <label htmlFor="Date">Date</label>
          <Form.Input
            onChange={handleInputChange}
            name="date"
            type="datetime-local"
            placeholder="Date"
            value={activity.date}
          />
          <label htmlFor="City">City</label>
          <Form.Input
            onChange={handleInputChange}
            name="city"
            placeholder="City"
            value={activity.city}
          />
          <label htmlFor="Venue">Venue</label>
          <Form.Input
            onChange={handleInputChange}
            name="venue"
            placeholder="Venue"
            value={activity.venue}
          />
          <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
          <Button
            onClick={() => setEditMode(false)}
            floated="right"
            type="button"
            color="red"
            content="Cancel"
          />
        </Form>
      </Segment>
    </Container>
  );
};

export default ActivityForm;
