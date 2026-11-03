import { useMemo, useState } from "react"

type Screen = "grid" | "collection" | "published"
type Modal = "clone" | "preview" | null

type NotificationItem = {
  id: number
  name: string
  value: string
  unit: string
  beforeAfter: string
  reference: string
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    name: "Fasting",
    value: "02",
    unit: "Hours",
    beforeAfter: "Before",
    reference: "Due Date",
  },
  {
    id: 2,
    name: "Taking Medicine",
    value: "01",
    unit: "Hours",
    beforeAfter: "Before",
    reference: "Due Date",
  },
  {
    id: 3,
    name: "Taking Medicine",
    value: "30",
    unit: "Minutes",
    beforeAfter: "After",
    reference: "Due Date",
  },
]

const gridRows = [
  {
    name: "Pre-procedure fasting instructions",
    author: "Sneha Deolay",
    status: "Active",
    created: "09/10/2025",
    published: "09/11/2025",
  },
  {
    name: "Post-procedure instructions",
    author: "Pawan F",
    status: "Inactive",
    created: "09/11/2025",
    published: "09/12/2025",
  },
  {
    name: "Post-procedure medication instruction",
    author: "Shubham B",
    status: "Active",
    created: "09/13/2025",
    published: "09/15/2025",
  },
]

function Icon({
  name,
}: {
  name: "eye" | "edit" | "trash" | "clone" | "search" | "plus" | "user" | "logout" | "back"
}) {
  const paths = {
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    edit: (
      <>
        <path d="M4 20h4l11-11-4-4L4 16v4Z" />
        <path d="m13.5 6.5 4 4" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13" />
        <path d="M10 11v5M14 11v5" />
      </>
    ),
    clone: (
      <>
        <rect x="8" y="8" width="11" height="11" rx="1" />
        <path d="M16 8V5H5v11h3" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    user: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c.6-4 3-6 7-6s6.4 2 7 6" />
      </>
    ),
    logout: (
      <>
        <path d="M10 5H5v14h5M14 8l4 4-4 4M18 12H9" />
      </>
    ),
    back: <path d="m14 6-6 6 6 6" />,
  }
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function Brand() {
  return (
    <div className="brand" aria-label="5thPort">
      <span className="brand-mark">
        <b>5</b>
      </span>
      <span>
        <b>5TH</b>PORT
      </span>
    </div>
  )
}

function Button({
  children,
  variant = "primary",
  disabled,
  onClick,
  title,
  type = "button",
}: {
  children: React.ReactNode
  variant?: "primary" | "outline" | "disabled"
  disabled?: boolean
  onClick?: () => void
  title?: string
  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      className={`btn btn-${disabled ? "disabled" : variant}`}
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  )
}

function Shell({
  children,
  onBack,
}: {
  children: React.ReactNode
  onBack?: () => void
}) {
  return (
    <div className="app-shell">
      <header className="header">
        <Brand />
        {onBack ? (
          <Button variant="outline" onClick={onBack}>
            <span className="inline-icon">
              <Icon name="back" />
            </span>{" "}
            Back
          </Button>
        ) : (
          <div className="account">
            <span>Navroze Eduljee</span>
            <div className="account-actions">
              <button className="header-button">
                <Icon name="user" /> Manage Account{" "}
                <span className="caret">▼</span>
              </button>
              <button className="header-button">
                <Icon name="logout" /> Logout
              </button>
            </div>
          </div>
        )}
      </header>
      <div className="spectrum" />
      <main className="page">{children}</main>
      <footer>
        <div>
          <Brand />
          <span className="tagline">Creating a World of Informed Patients</span>
          <small>© 2017–2025 5thPort. All Rights Reserved.</small>
        </div>
        <div className="footer-actions">
          <button>Submit a request</button>
          <button>Legal Notification</button>
        </div>
      </footer>
    </div>
  )
}

function GridScreen({
  onOpen,
  onNew,
}: {
  onOpen: () => void
  onNew: () => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [query, setQuery] = useState("")
  const filteredRows = gridRows.filter((row) =>
    row.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <Shell>
      <nav className="tabs">
        {[
          "Video Manager",
          "Quiz Manager",
          "Education Acknowledgement",
          "Document Management",
          "Forms",
          "Notifications",
        ].map((tab) => (
          <button key={tab} className={tab === "Notifications" ? "active" : ""}>
            {tab}
          </button>
        ))}
      </nav>
      <section className="grid-toolbar">
        <label className="search">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Quick Search"
          />
          <Icon name="search" />
        </label>
        <label className="check">
          <input type="checkbox" /> Include Inactive
        </label>
        <div className="toolbar-actions">
          <Button disabled={selected === null} onClick={onOpen}>
            <span className="inline-icon">
              <Icon name="clone" />
            </span>{" "}
            Clone
          </Button>
          <Button onClick={onNew}>
            <span className="inline-icon">
              <Icon name="plus" />
            </span>{" "}
            New
          </Button>
        </div>
      </section>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {[
                "Name",
                "Author",
                "Status",
                "Created Date",
                "Published Date",
              ].map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
            <tr className="filters">
              <th>
                <input />
              </th>
              <th>
                <input />
              </th>
              <th>
                <input />
              </th>
              <th>
                <input type="date" />
              </th>
              <th>
                <input type="date" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, index) => (
              <tr
                key={row.name}
                className={selected === index ? "selected" : ""}
                onClick={() => setSelected(index)}
                onDoubleClick={onOpen}
              >
                <td>{row.name}</td>
                <td>{row.author}</td>
                <td>{row.status}</td>
                <td>{row.created}</td>
                <td>{row.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filteredRows.length && (
          <p className="empty">No notifications match your search.</p>
        )}
      </div>
    </Shell>
  )
}

function CollectionHeader({
  editing,
  setEditing,
  onReturn,
  deactivate,
}: {
  editing: boolean
  setEditing: (value: boolean) => void
  onReturn: () => void
  deactivate: () => void
}) {
  return (
    <section className="collection-head">
      <div className="field span-2">
        <label>Collection Name:</label>
        <input
          disabled={!editing}
          defaultValue="Pre-procedure fasting instructions"
        />
      </div>
      <div className="field">
        <label>Collection ID</label>
        <input disabled value="5ab55c864764fd0ca48152bd" />
      </div>
      <div className="side-buttons">
        <Button variant="outline" onClick={onReturn}>
          Return
        </Button>
        <Button onClick={() => setEditing(!editing)}>
          {editing ? "Save" : "Edit"}
        </Button>
        <Button onClick={deactivate}>Deactivate</Button>
      </div>
      <div className="field span-2">
        <label>Tags:</label>
        <input disabled={!editing} placeholder="Add Tag & Press Enter/Space" />
      </div>
      <div className="field">
        <label>Template:</label>
        <select disabled={!editing}>
          <option>Email Header / Footer</option>
          <option>Standard Email</option>
        </select>
      </div>
    </section>
  )
}

function NotificationEditor({
  item,
  onSave,
  onClose,
  onPreview,
}: {
  item?: NotificationItem
  onSave: (item: NotificationItem) => void
  onClose: () => void
  onPreview: () => void
}) {
  const [draft, setDraft] = useState<NotificationItem>(
    item ?? {
      id: Date.now(),
      name: "",
      value: "",
      unit: "Hours",
      beforeAfter: "Before",
      reference: "Due Date",
    },
  )
  const set = (key: keyof NotificationItem, value: string) =>
    setDraft((current) => ({ ...current, [key]: value }))
  return (
    <section className="editor-panel">
      <div className="editor-grid">
        <div className="field">
          <label>Name:</label>
          <input
            value={draft.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Notification name"
          />
        </div>
        <div className="field">
          <label>Time Value</label>
          <input
            value={draft.value}
            onChange={(e) => set("value", e.target.value)}
            placeholder="02"
          />
        </div>
        <div className="field">
          <label>Time Unit</label>
          <select
            value={draft.unit}
            onChange={(e) => set("unit", e.target.value)}
          >
            <option>Hours</option>
            <option>Minutes</option>
            <option>Days</option>
          </select>
        </div>
        <div className="field">
          <label>Before / After</label>
          <select
            value={draft.beforeAfter}
            onChange={(e) => set("beforeAfter", e.target.value)}
          >
            <option>Before</option>
            <option>After</option>
          </select>
        </div>
        <div className="field span-2">
          <label>Time Reference</label>
          <select
            value={draft.reference}
            onChange={(e) => set("reference", e.target.value)}
          >
            <option>Due Date</option>
            <option>Procedure Date</option>
          </select>
        </div>
        <div className="field span-all">
          <label>SMS Text</label>
          <textarea
            rows={2}
            defaultValue={
              "Hi {{PatientFirstName}},\nJust a quick note to remind you about your upcoming fasting schedule. Your well-being comes first"
            }
          />
        </div>
        <div className="field span-2">
          <label>Email Subject</label>
          <input defaultValue="Pre-procedure fasting reminder" />
        </div>
        <div className="field span-all">
          <label>Email Text</label>
          <div className="rich-editor">
            <div className="rich-tools">
              <b>B</b> <i>I</i> <u>U</u>
              <span>Segoe UI</span>
              <span>10 pt</span>
              <span>Paragraph</span>
              <span>≡</span>
              <span>▦</span>
              <span>↗</span>
            </div>
            <div contentEditable suppressContentEditableWarning>
              <p>Hi {"{{PatientFirstName}}"},</p>
              <p>
                Just a quick note to remind you about your upcoming fasting
                schedule. If you feel uncomfortable at any point, it’s okay to
                adjust your plan. Your well-being comes first.
              </p>
              <p>
                <strong>Motivational Quote:</strong>
                <br />
                “Take care of your body. It’s the only place you have to live.”
              </p>
              <p>
                <strong>Health Tip:</strong>
                <br />
                During your eating window, include foods rich in fibre and
                protein—like fruits, vegetables, and lean meats—to keep you
                energized and prevent cravings.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="editor-actions">
        <Button variant="outline" onClick={onPreview}>
          <Icon name="eye" /> Preview
        </Button>
        <Button onClick={() => onSave(draft)}>Save</Button>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </section>
  )
}

function CollectionScreen({
  onReturn,
  onPublished,
  isNew,
}: {
  onReturn: () => void
  onPublished: () => void
  isNew: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [notifications, setNotifications] = useState(
    isNew ? [] : initialNotifications,
  )
  const [editorId, setEditorId] = useState<number | "new" | null>(null)
  const [modal, setModal] = useState<Modal>(null)
  const [cloneSource, setCloneSource] = useState<NotificationItem | null>(null)
  const [status, setStatus] = useState("In Development")
  const [message, setMessage] = useState("")
  const editorItem =
    typeof editorId === "number"
      ? notifications.find((item) => item.id === editorId)
      : undefined

  const notify = (text: string) => {
    setMessage(text)
    window.setTimeout(() => setMessage(""), 2500)
  }
  const saveItem = (item: NotificationItem) => {
    setNotifications((current) =>
      current.some((entry) => entry.id === item.id)
        ? current.map((entry) => (entry.id === item.id ? item : entry))
        : [...current, item],
    )
    setEditorId(null)
    notify("Notification saved successfully.")
  }
  const remove = (id: number) => {
    setNotifications((current) => current.filter((item) => item.id !== id))
    notify("Notification deleted.")
  }

  return (
    <Shell>
      <CollectionHeader
        editing={editing}
        setEditing={setEditing}
        onReturn={onReturn}
        deactivate={() => {
          setStatus("Inactive")
          notify("Collection deactivated.")
        }}
      />
      <section className="collection-panel">
        <h2>Notification Collection:</h2>
        <div className="collection-main">
          <div className="metadata">
            <div>
              <label>Language:</label>
              <select>
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
              </select>
            </div>
            <div>
              <label>Name:</label>
              <input defaultValue="Pre-procedure fasting ins" />
            </div>
            <div>
              <label>Description:</label>
              <input defaultValue="Fasting Desc" />
            </div>
            <div>
              <label>Version:</label>
              <select>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
          <div className="metadata readout">
            <div>
              <label>Status:</label>
              <span>{status}</span>
            </div>
            <div>
              <label>ID:</label>
              <span>5e4bddbd8af971df74d6cdb3</span>
            </div>
            <div>
              <label>Publish Date:</label>
              <span>{status === "Published" ? "11/10/2025" : "—"}</span>
            </div>
            <div>
              <label>Publisher Name:</label>
              <span>{status === "Published" ? "Dr. Riya Sharma" : "—"}</span>
            </div>
          </div>
          <div className="stack-actions">
            <Button onClick={() => setEditorId("new")}>Add New</Button>
            <Button onClick={() => notify("Collection details saved.")}>
              Save
            </Button>
            <Button
              disabled={!notifications.length}
              onClick={() => {
                setStatus("Retired")
                notify("Collection retired.")
              }}
            >
              Retire
            </Button>
            <Button
              disabled={!notifications.length}
              onClick={() => notify("A new collection version was created.")}
            >
              Save As New
            </Button>
            <Button disabled={!notifications.length} onClick={onPublished}>
              Publish
            </Button>
          </div>
        </div>
        {!!notifications.length && (
          <div className="notification-list">
            {notifications.map((item) => (
              <div className="notification-row" key={item.id}>
                <span>{item.name}</span>
                <span>{item.value}</span>
                <span>{item.unit}</span>
                <span>{item.beforeAfter}</span>
                <span>{item.reference}</span>
                <div className="row-actions">
                  <button
                    title="Preview notification"
                    onClick={() => setModal("preview")}
                  >
                    <Icon name="eye" />
                  </button>
                  <button
                    title="Edit notification"
                    onClick={() => setEditorId(item.id)}
                  >
                    <Icon name="edit" />
                  </button>
                  <button
                    title="Delete notification"
                    onClick={() => remove(item.id)}
                  >
                    <Icon name="trash" />
                  </button>
                  <button
                    title="Clone notification"
                    onClick={() => {
                      setCloneSource(item)
                      setModal("clone")
                    }}
                  >
                    <Icon name="clone" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      {editorId !== null && (
        <NotificationEditor
          item={editorItem}
          onSave={saveItem}
          onClose={() => setEditorId(null)}
          onPreview={() => setModal("preview")}
        />
      )}
      {message && (
        <div className="toast" role="status">
          {message}
        </div>
      )}
      {modal === "clone" && cloneSource && (
        <CloneModal
          source={cloneSource}
          onClose={() => setModal(null)}
          onClone={(name) => {
            setNotifications((current) => [
              ...current,
              { ...cloneSource, id: Date.now(), name },
            ])
            setModal(null)
            notify("Notification cloned successfully.")
          }}
        />
      )}
      {modal === "preview" && <PreviewModal onClose={() => setModal(null)} />}
    </Shell>
  )
}

function CloneModal({
  source,
  onClose,
  onClone,
}: {
  source: NotificationItem
  onClose: () => void
  onClone: (name: string) => void
}) {
  const [name, setName] = useState(`New ${source.name} notification`)
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal clone-modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-title">
          <h2>Create Clone</h2>
          <button aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="clone-fields">
          <label>
            Existing Collection Name:
            <input disabled value={source.name} />
          </label>
          <label>
            Clone Collection Name:
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div className="modal-footer">
          <Button onClick={() => onClone(name)}>Clone</Button>
          <Button onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

function PreviewModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal preview-modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-title">
          <h2>Notification Details</h2>
          <button aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="viewer-tools">
          <span>▣</span>
          <span>⌕</span>
          <span>↕</span>
          <span>↻</span>
          <span>−</span>
          <span>+</span>
          <span>Automatic Zoom</span>
          <span>»</span>
        </div>
        <article className="email-preview">
          <small>
            Template: #61
            <br />
            Subject: Fasting Reminder
          </small>
          <div className="email-title">
            <span>Fasting Reminder</span>
            <a>Contact 5thPort</a>
          </div>
          <Brand />
          <p>Hi Sneha,</p>
          <p>
            Just a quick note to remind you about your upcoming fasting
            schedule. We know life gets busy, so here’s a little nudge to help
            you stay on track!
          </p>
          <p>
            Remember to stay hydrated and listen to your body. If you feel
            uncomfortable at any point, it’s okay to adjust your plan. Your
            well-being comes first.
          </p>
          <p>
            <strong>Health Tip:</strong>
            <br />
            During your eating window, include foods rich in fibre and
            protein—like fruits, vegetables, and lean meats—to keep you
            energized and prevent cravings.
          </p>
          <p>
            <strong>Motivational Quote:</strong>
            <br />
            “Take care of your body. It’s the only place you have to live.”
          </p>
          <p className="help">
            Any Questions? Need Help? Want to Connect? We’re Always Here for
            You.
            <br />
            Reach out to <u>5thPort</u>.
          </p>
          <div className="email-footer">
            <b>5THPORT</b> | Creating a world of informed patients.
            <small>
              5 Community Drive, Suite 1, Augusta, Maine 04430
              <br />© 2025 5thPort Healthcare LLC. All Rights Reserved.
            </small>
          </div>
        </article>
      </div>
    </div>
  )
}

function PublishedScreen({ onBack }: { onBack: () => void }) {
  const options = [
    "Pre-procedure fasting instructions",
    "Post-procedure instructions",
    "Post-procedure medication instruction",
  ]
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([options[0]])
  const summary = useMemo(
    () => (selected.length ? selected.join(", ") : "Select notifications"),
    [selected],
  )
  const toggle = (option: string) =>
    setSelected((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    )
  return (
    <Shell onBack={onBack}>
      <div className="published-area">
        <section className="published-card">
          <div className="published-top">
            <div className="field">
              <label>Collection Name:</label>
              <input placeholder="Collection Name" />
            </div>
            <div className="field">
              <label>Communication Template:</label>
              <select>
                <option>App Workflow - Healthcare</option>
              </select>
            </div>
            <div className="field">
              <label>Collection ID:</label>
              <input disabled placeholder="Collection ID" />
            </div>
            <div className="side-buttons">
              <Button variant="outline" onClick={onBack}>
                Return
              </Button>
              <Button disabled>Save</Button>
              <Button disabled>Assign ICD 10 codes</Button>
            </div>
            <div className="field">
              <label>Tags:</label>
              <input placeholder="Add Tag & Press Enter/Space" />
            </div>
            <div className="field multiselect-field">
              <label>Notifications</label>
              <button className="multiselect" onClick={() => setOpen(!open)}>
                <span>{summary}</span>
                <span>⌄</span>
              </button>
              {open && (
                <div className="multi-menu">
                  {options.map((option) => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        checked={selected.includes(option)}
                        onChange={() => toggle(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
            <label className="custom-check">
              <input type="checkbox" /> Custom Schedule{" "}
              <span title="Configure a custom notification schedule">●</span>
            </label>
            <div className="field span-2">
              <label>Department</label>
              <select>
                <option>Not Assigned</option>
              </select>
            </div>
            <div className="field span-2">
              <label>Treatment Type</label>
              <select>
                <option>Not Assigned</option>
              </select>
            </div>
            <div className="field span-2">
              <label>Disease Site</label>
              <select>
                <option>Not Assigned</option>
              </select>
            </div>
            <div className="field span-2">
              <label>Patient Journey</label>
              <select>
                <option>Not Assigned</option>
              </select>
            </div>
          </div>
          <div className="template-details">
            <div className="metadata">
              <div>
                <label>Name:</label>
                <input placeholder="Template Name" />
              </div>
              <div>
                <label>Description:</label>
                <input placeholder="Template Description (Optional)" />
              </div>
              <div>
                <label>Version:</label>
                <select>
                  <option />
                </select>
              </div>
            </div>
            <div className="metadata">
              <div>
                <label>Status:</label>
                <input disabled placeholder="In Development" />
              </div>
              <div>
                <label>Template Id:</label>
                <input disabled placeholder="Template ID" />
              </div>
              <div>
                <label>Publish Date:</label>
                <input disabled placeholder="Publish Date" />
              </div>
              <div>
                <label>Retire Date:</label>
                <input disabled placeholder="Retire Date" />
              </div>
            </div>
          </div>
          <div className="assets">
            <div>
              <h3>Assets</h3>
              {[
                "Video",
                "Document",
                "Acknowledgement",
                "Quiz",
                "Informed Consent",
                "Form",
              ].map((asset) => (
                <div className="asset-row" key={asset}>
                  <button>+</button>
                  <span>{asset}</span>
                  <input placeholder={`Search ${asset}`} />
                </div>
              ))}
            </div>
            <button className="move-asset">›</button>
            <div>
              <h3>Education Plan Preview</h3>
              <div className="plan-preview" />
            </div>
          </div>
        </section>
      </div>
    </Shell>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("grid")
  const [isNew, setIsNew] = useState(false)
  if (screen === "grid")
    return (
      <GridScreen
        onOpen={() => {
          setIsNew(false)
          setScreen("collection")
        }}
        onNew={() => {
          setIsNew(true)
          setScreen("collection")
        }}
      />
    )
  if (screen === "published")
    return <PublishedScreen onBack={() => setScreen("collection")} />
  return (
    <CollectionScreen
      isNew={isNew}
      onReturn={() => setScreen("grid")}
      onPublished={() => setScreen("published")}
    />
  )
}
