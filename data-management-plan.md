# Data Management Plan: end/line

## Types and Collection

This project, end/line, is a web application that solicits plain text poetry and TEI XML encodings of that poetry from users. They will do so through submission forms on  [endlineproject.org](https://endlineproject.org), a website that we will build using a [Bootstrap](http://getbootstrap.com/) framework and will be hosted on [Heroku](https://www.heroku.com/). Users of end/line will also be able to search for poems and encodings, invite others to encode a poem, and compare any two encodings of the same poem through a front-end display that highlights their differences. They must create accounts—with email addresses, first/last names, and usernames—in order to submit either plain text poetry or TEI XML encodings. The code for this website will be openly available on [GitHub](https://github.com/tlewek/end-line) and released under an [MIT license](https://github.com/tlewek/end-line/blob/master/LICENSE.md).

In addition to the data associated with the website, this project will also maintain a [Twitter account](https://twitter.com/endlineproject), [blog](endlineproject.commons.gc.cuny.edu), shared Google and Slack accounts, and a Trello account that details the tasks required to release endlineproject.org. Furthermore, the project team will write and a collaborative paper explaining the project upon its completion.

We expect that this project will be of interest to teachers, scholars, and students of the digital humanities and literature.

## Storage and Protection

We will manage all of this plain text, TEI XML, and user information data through the following SQL tables in a [Postgres](https://www.postgresql.org/) database:

Poems
- `id`
- `title`
- `author`
- `text`

Posts
- `id `
- `text`
- `datetime`
- `poem_id`

Posted
- `post_id`
- `u_id`

Users
- `id`
- `username`
- `password`
- `salt`

Profile
- `u_id`
- `email`
- `name`

While neither the plain text poetry submissions nor the TEI XML encodings constitute sensitive data, the data contained in the Users table above do. We will, therefore, hash and encrypt this data using a salt.

## Sustainability and Documentation

The use of common and standard technologies—plain text, TEI XML, a JavaScript framework like Bootstrap, and SQL—articulate this project’s emphasis on sustainability. Ultimately, however, the CUNY Graduate Center will sustain end/line for one year before reassessing its commitment. At the moment, the Graduate Center has purchased the domain name for this project and may purchase additional Heroku hosting and/or Postgres database storage capabilities.

Regardless of the Graduate Center’s long-term commitment to end/line, the project team will create documentation on data types, collection practices, and storage procedures and post them to the project’s GitHub repository as markdown files. We will also seek to maintain the Twitter account and blog mentioned above and to archive a JSON file of our Trello account (again to the project’s GitHub repository) after the release of endlineproject.org. We will incorporate any relevant information contained in the shared Google or Slack accounts into our documentation. The collaborative paper mentioned above will be published on the project’s GitHub repository as a markdown file.

As project director and project manager, Tom Lewek will be responsible for the implementation of this data management plan.

