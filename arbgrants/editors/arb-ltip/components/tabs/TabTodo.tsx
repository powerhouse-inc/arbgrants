import type { IProps } from "../../editor.js";
import PlannedResourcesForm from "../forms/PlannedResourcesForm.js";
import PhaseTimeline from "../PhaseTimeline.js";
import ReportingForm from "../forms/ReportingForm.js";
import FinalizingForm from "../forms/FinalizingForm.js";
import {
  usePhaseStatus,
  useTodoPhase,
  useTodoPhaseIndex,
} from "../../hooks/use-todo-phase.js";
import PhaseTimespan from "../PhaseTimespan.js";

type TabTodoProps = IProps;
const TabTodo = (props: TabTodoProps) => {
  const phases = props.document.state.global.phases;

  const phaseIndex = useTodoPhaseIndex(phases);
  const phase = useTodoPhase(phases);
  const status = usePhaseStatus(phase ?? null);

  return (
    <div>
      {phase && status !== "Invalid" && (
        <>
          <PhaseTimeline status={status} />

          <div className="w-full">
            <div className="isolate -space-y-px rounded-md shadow-sm">
              <PhaseTimespan phase={phase} />

              {status === "Planning" && (
                <PlannedResourcesForm
                  state={props.document.state.global}
                  phase={phase}
                  phaseIndex={phaseIndex}
                  {...props}
                />
              )}
              {status === "Reporting" && (
                <ReportingForm
                  state={props.document.state.global}
                  phase={phase}
                  phaseIndex={phaseIndex}
                  {...props}
                />
              )}
              {status === "Finalizing" && (
                <FinalizingForm
                  phase={phase}
                  phaseIndex={phaseIndex}
                  {...props}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TabTodo;
