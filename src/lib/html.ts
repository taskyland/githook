export class View extends Response {
  constructor(view: string, headers?: Record<string, string>) {
    super(view, {
      status: 200,
      headers: Object.assign(
        {
          "Content-Type": "text/html",
        },
        headers
      ),
    });
  }
}
export class Status extends Response {
  constructor(view: string, status: number) {
    super(view, {
      status: status,
      headers: Object.assign({
        "Content-Type": "application/json; charset=utf-8",
      }),
    });
  }
}

export const Html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <title>githook</title>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
</head>

<body>
  <h1>githook</h1>
  <p>
    Filters useless Github events (bot pushes, state changes, etc) before
    forwarding to Discord, reducing noise.
  </p>
  <p>
    An instance is hosted at
    <a href="https://githook.tasky.workers.dev/">https://githook.tasky.workers.dev/</a>.
  </p>
  <h2>Configuration</h2>
  <p>The webhook can be configured with the following params:</p>
  <ul>
    <li>
      <p>
        Only forward events from specific branches
        (<code>allowBranches</code>, simplified wildcard syntax)
      </p>
      <ul>
        <li>
          <code>abc*xyz</code> is equivalent to <code>/^(abc.*xyz)$/</code>
        </li>
      </ul>
    </li>
    <li>
      <p>Ignore certain commit messages (<code>hideMessages</code>)</p>
       <ul>
        <li>
          <code>update*</code> will ignore anything matching with update (Regex: <code>/^(update*)$/</code>)
        </li>
      </ul>
    </li>
    <li>
      <p>Ignore release tag updates (<code>hideTags</code>)</p>
    </li>
  </ul>
  <style type="text/css">
    :root {
      --bg: #16181d;
      --english-red: #b13c52;
      --text-accent: #c0caf5;
      --text-hover: #a8dadc;
    }

    body {
      font-family: "Roboto", sans-serif;
      max-width: 60rem;
      padding: 2rem;
      margin: auto;
      background: var(--bg);
      color: var(--text-accent);
    }

    a {
      color: var(--english-red);
      text-decoration: underline;
      text-underline-offset: 4px;
      text-decoration-style: solid;
      text-decoration-color: transparent;
      -webkit-text-decoration-color: transparent;
      transition: text-decoration-color .25s;
    }

    a:hover {
      color: var(--text-hover);
      text-decoration-color: var(--vp-c-brand);
      -webkit-text-decoration-color: var(--vp-c-brand);
    }

    pre {
      font-size: 7px;
      font-family: Ubuntu Mono, monospace;
      opacity: 0.9;
      color: var(--text-accent);
      line-height: 7px;
      padding: 1em;
      border: 0;
    }

    h1, h2 {
      margin-bottom: 0.1rem;
    }
  </style>
</body>

</html>
`;
