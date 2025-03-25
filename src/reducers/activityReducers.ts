import { Activity } from "../types";
/* ACA SE DEFINEN LAS ACCIONES */
/* va ser un type que describe lo que va a pasar en el reducer */
/*  */
export type ActivityActions =
  /* esta formado por 2 partes el type y el payload, el type describe que es lo que esta suciendo y el payload:datos que se agregan al state*/
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activeId"; payload: { id: Activity["id"] } }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type: "restart-app" };
/* este es un state que va ser un objeto por lo que hay q asignarle un type */
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

/* este conecta ambos. le tenemos q pasar el state y el action */
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    /* este codigo maneja la logica para manejar el state */
    let updateActivities: Activity[] = [];
    if (state.activeId) {
      updateActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updateActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updateActivities,
      activeId: "",
    };
  }
  if (action.type === "set-activeId") {
    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }

  if (action.type === "restart-app") {
    return {
      activities: [],
      activeId: "",
    };
  }
  return state;
};
