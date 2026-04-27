import type {
  ArbitrumStipGranteeDocument,
  ArbitrumStipGranteeAction,
} from "document-models/arbitrum-stip-grantee";
import { useSelectedArbitrumStipGranteeDocument } from "document-models/arbitrum-stip-grantee";
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import { useUser } from "@powerhousedao/reactor-browser";
import { DocumentToolbar } from "@powerhousedao/design-system/connect/index";
import { useMemo, useState } from "react";
import GranteeForm from "./components/forms/GranteeForm.js";
import TabTodo from "./components/tabs/TabTodo.js";
import { classNames } from "./util.js";
import TabSummary from "./components/tabs/TabSummary.js";
import TabHistorical from "./components/tabs/TabHistorical.js";
import TabAdmin from "./components/tabs/TabAdmin.js";
import { UserProvider } from "./components/UserProvider.js";
import useIsAdmin from "./hooks/use-is-admin.js";
import useIsEditor from "./hooks/use-is-editor.js";

export type IProps = {
  document: ArbitrumStipGranteeDocument;
  dispatch: DocumentDispatch<ArbitrumStipGranteeAction>;
};

type TabHeaderProps = {
  active: string;
  setActive: (a: string) => void;
};

const TabHeader = ({ active, setActive }: TabHeaderProps) => {
  const tabs = [{ name: "Summary" }, { name: "Historical" }];

  const isAdmin = useIsAdmin();
  if (isAdmin) {
    tabs.push({ name: "Admin" });
  }

  const isEditor = useIsEditor();
  if (isEditor) {
    tabs.splice(1, 0, { name: "Todo" });
  }

  const tabElements = useMemo(
    () =>
      tabs.map((tab) => (
        <p
          key={tab.name}
          className={classNames(
            tab.name === active
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
            "cursor-pointer whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium",
          )}
          aria-current={tab.name === active ? "page" : undefined}
          onClick={() => setActive(tab.name)}
        >
          {tab.name}
        </p>
      )),
    [active],
  );

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 justify-center" aria-label="Tabs">
        {tabElements}
      </nav>
    </div>
  );
};

export function BaseEditor({ document, dispatch }: IProps) {
  const user = useUser();
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("Summary");

  const {
    disbursementContractAddress,
    fundingAddress,
    fundingType,
    granteeName,
  } = document.state.global;

  const isValid = useMemo(() => {
    if (!disbursementContractAddress) return false;
    if (!fundingAddress) return false;
    if (!fundingType) return false;
    if (!granteeName) return false;
    return true;
  }, [disbursementContractAddress, fundingAddress, fundingType, granteeName]);

  const props: IProps = { document, dispatch };

  return (
    <UserProvider user={user} state={document.state.global}>
      <div className="lg:w-[840px] mx-auto [&_input]:outline-none [&_textarea]:outline-none">
        {!isValid || isEditMode ? (
          <GranteeForm
            {...document.state.global}
            dispatch={dispatch}
            onClose={() => setIsEditMode(false)}
          />
        ) : (
          <>
            <TabHeader active={activeTab} setActive={setActiveTab} />
            {activeTab === "Summary" && (
              <TabSummary
                {...document.state.global}
                onEdit={() => setIsEditMode(true)}
                onOpenHistorical={() => setActiveTab("Historical")}
              />
            )}
            {activeTab === "Todo" && <TabTodo {...props} />}
            {activeTab === "Historical" && <TabHistorical {...props} />}
            {activeTab === "Admin" && (
              <TabAdmin title={granteeName || "Admin"} {...props} />
            )}
          </>
        )}
      </div>
    </UserProvider>
  );
}

export default function Editor() {
  const [document, dispatch] = useSelectedArbitrumStipGranteeDocument();

  return (
    <>
      <DocumentToolbar />
      <BaseEditor document={document} dispatch={dispatch} />
    </>
  );
}
