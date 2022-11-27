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
  <h1>Configuration</h1>
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
      <p>Ignore release tag updates (<code>hideTags</code>)</p>
    </li>
  </ul>
  <style type="text/css">
    :root {
      --bg: #16181d;
      --english-red: #b13c52;
      --text-accent: #f1faee;
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
      text-decoration: none;
    }

    a:hover {
      color: var(--text-hover);
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

    h1,
    h2,
    h3,
    h4,
    h5 {
      color: #77B0BB;
      margin-bottom: 0.1rem;
    }

    footer {
      text-align: center;
    }
  </style>
</body>

</html>
`;
