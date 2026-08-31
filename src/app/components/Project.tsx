export default function Project({
  name,
  description,
  language,
  live,
  source,
}: {
  name: string;
  description: string;
  language: string;
  live?: string;
  source?: string;
}) {
  return (
    <div className="project">
      <div className="project-head">
        <a
          className="project-name"
          href={live ?? source}
          target="_blank"
          rel="noreferrer"
        >
          {name}
        </a>
        <span className="project-kind">{language}</span>
      </div>
      {description && <p className="project-desc">{description}</p>}
      <div className="project-links">
        {live && (
          <a className="ui-button" href={live} target="_blank" rel="noreferrer">
            Open
          </a>
        )}
        {source && (
          <a
            className="ui-button"
            href={source}
            target="_blank"
            rel="noreferrer"
          >
            Source
          </a>
        )}
      </div>
    </div>
  );
}
