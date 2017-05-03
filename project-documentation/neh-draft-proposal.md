# Reading Poetry Closely with Textual Encoding Initiative XML

## Contents

- [List of Participants](#list-participants)
- [Abstract](#abstract)
- [Narrative](#narrative)
- [Budget](#budget)
- [Biographies](#biographies)
- [Data Management Plan](#data-management-plan)
- [Letters of Support](#letters-support)
- [Appendix A: Use Cases](#appendix-use-cases)
- [Works Cited](#works-cited)

## List of Participants

### Principal Investigator

Rhody, Lisa, PhD, Deputy Director of Digital Initiatives, Graduate Center, City University of New York.

### Staff

#### Community Management

Kirby, Michael, Graduate Student, Liberal Studies, Graduate Center, City University of New York.

Moscardi, Iuri, Graduate Student, Comparative Literature, Graduate Center, City University of New York.

#### Development

Hamilton, Brian, Graduate Student, Liberal Studies, Graduate Center, City University of New York.

Rocco, Gregory, Graduate Student, Liberal Studies, Graduate Center, City University of New York.

#### Project Management

Lewek, Tom, Graduate Student, Liberal Studies, Graduate Center, City University of New York.

### Advisory Board

Singer, Kate, PhD, Associate Professor, Department of English, Mount Holyoke College.

[more tk]

## Abstract

Reading poetry closely requires the reader to slow down and attend to the formal features of the text at hand. Similarly, encoding a document, in a markup language like XML, requires the encoder to understand, carefully, the structural and semantic makeup of the document. Through this shared attention to form, structure, and semantics, we can use Textual Encoding Initiative XML as a pedagogical aid for teachers and students of poetry.

This project will deliver a prototype of a Web-based application that allows users to search for or upload poetry, encode that poetry, and compare their encodings to those of others. 

This technology might help teachers of either poetry and poetics or the digital humanities. Indeed, it could supplement in-class discussions on the practice of close reading or the mechanics of encoding; it could also help teachers solicit and review encoding assignments. Though textual scholars might also be interested in such a prototype—e.g. for building small-scale digital editions with various transcriptions or markup—this project will focus more on pedagogy than on scholarship. Given that encoding remains a fundamental aspect of computing, and close reading a fundamental tactic for interpreting poetry, such technology should remain relevant for the foreseeable future.

### Statement of Innovation

### Statement of Humanities Significance

## Narrative

If text encoding constitutes a fundamental, but basic, task in computing, then close reading constitutes a similarly fundamental, but basic, task in literary criticism. For many developers, wrangling HTML or XML tags remains a mundane part of their work—important, certainly, but not as energizing as writing, for example, applications in Python, Ruby, or a host of other programming languages. Meanwhile, close reading encourages literary critics to demonstrate how the formal elements of a literary text articulate meaning. Since the emergence of close reading, in the post-war period dominated by the New Criticism, however, literary critics have increasingly emphasized the importance of contextual, rather than formal, readings of texts. While close reading operates as an indispensable tool, it serves as the basis for contextual interpretations of literary texts in contemporary scholarship.

How might humanists, then, approach encoding and close reading? Should they continue to assign both basic roles in their respective spheres? Or should the (digital) humanities establish new connections between encoding and close reading and, in doing so, re-envision their roles in contemporary literary studies? The second approach seems worthwhile and, as Kate Singer has argued in the *Journal of Interactive Technology and Pedagogy*, “the practice of encoding effectively engages the encoder in a determinative act of reading” (Singer). Encoding, in other words, generates a (close) reading of the text at hand. Susan Schreibman makes a similar argument: “Text encoding ... is not theory-free. It is subjective, theoretical, and interpretative. Texts, particularly literary texts, have competing hierarchies, all of which may have equal claim to being represented as they express different views of the text” (Schreibman). “Subjective,” “theoretical,” “interpretive,” and “competing hierarchies” that “express different views of the text”—the vocabulary here could describe close reading. If encoding prompts “determinative” reading, and if encoding itself is never “theory-free,” then we can regard it increasingly as a humanistic act. Devising a platform, and building a prototype of it, can encourage others to see these connections and incorporate them into their pedagogy (or even scholarship).

Of course, individuals could encode any literary text or document with such a prototype. Poetry, however, offers a good point of departure for considering the relationship between encoding and close reading. Studying poetry forces readers to contend with formal techniques related to hierarchies (e.g. section, stanza, line) and semantic values (e.g. alliteration, enjambment, simile) that encoding might capture well. As Chuck Rybak writes in *Digital Pedagogy in the Humanities*, “Poetry is a formal enterprise, and those forms have been evolving for centuries. We have new forms before us. We need new pedagogies to match” (Rybak). This project aims to aid new pedagogies for the study of “the formal enterprise” of poetry. In encoding, it finds a digital practice akin to the close reading that has, for some time, been the means for understanding the forms, and the evolution of those forms, that comprise poetry.

**Proposal Goals.**

**Problem Statement and Motivations.**

**Proposed Approach.**

**Further Rationales and Broader Impacts.**

### Environmental Scan

This project will allow users to upload a poetic text of their choosing, encode it based on TEI Guidelines, and then compare their own encodings with those of others. Yet end/line is not the only TEI-based project focused on poetry in the English language—far from it. TEI is also "a consortium which collectively develops and maintains a standard for the representation of texts in digital form," and it’s important to elaborate on how this project fits into the TEI environment. Reviewing some projects listed on the TEI website, many of which are digital editions or repositories, reveals a multitude of initiatives similar to end/line.

For example, the American Verse Project developed by the University of Michigan Text Initiative and the University of Michigan Press is an archive of American poetry published before 1920: the texts have been coded in SGML with TEI, and users can search by single or associated words and by title and author, though they cannot upload their own texts. Similarly, the British Women Romantic Poets 1789-1832, developed by the University of California, Davis, is "an online scholarly archive consisting of E-text editions" of British female poets "written (not necessarily published) between 1789 and 1832". Texts are selected by an Editorial Advisory Board consisting of scholars, scanned and converted to ASCII format using an OCR software and, finally, imported into a SGML editor; users can browse the texts. Despite the availability of the texts, this is a closed project because scholars chose and encoded the texts. The terms used to define some of these projects clearly define their modes of interaction with users: the project that "makes high-resolution images of Dickinson’s surviving manuscripts available in open access, and provides readers with a website through which they can view images of manuscripts" is the Emily Dickinsonarchive , while the place where it is possible to study "the literary history of popular British and American poetry" is the Poetess archive. The same separation between scholarly producers and interested audiences can be found also in projects regarding non-English texts like the Princeton Charrette Project, which explores the tradition of the medieval French text Le Chevalier de la Charrette by Chretien de Troyes; or Dante Search by Università di Pisa, aimed to provide a catalogue of Dante's words in his Latin and vernacular works. 

Kate Singer, whose work informs this project, has agreed to serve as an advisor to this project. 

### History and Duration of the Project

### Work Plan

## Biographies

**Project Lead**

At the CUNY Graduate Center, Tom Lewek is a MALS student whose work focuses on the intersections of the digital humanities and twentieth- and twenty-first-century poetry and poetics. He proposed end/line, a web application for encoding and comparing encodings of poetry with TEI XML, in January 2017 and currently serves as its project lead. This role entails establishing, refining, and communicating the project’s humanistic importance and working with the community management and development teams to deliver it. Outside of the Graduate Center, he is the head of online production at the Modern Language Association where he coordinates the content management and web development of mla.org, the Literary Research Guide, various MLA publications on Humanities Commons, and other digital products and properties. He holds a BA from Hamilton College in English literature.

**Community Managers**

Iuri Moscardi, born in Italy, is now a PhD student in Comparative Literature (Italian specialization) at CUNY Graduate Center: his research is focused on contemporary Italian literature and Digital Humanities. He is a member of the end/line development team, where he serve as Community Manager in maintaining contacts with the wider TEI community.

Michael Kirby is a MALS student at The Graduate Center, CUNY, specializing in Digital Humanities. His main interest is contemporary poetry and poetics, and work, both creative and journalistic, can be found in Spikes Arts Quarterly	and Best American Experimental Writing 2016. He is a member of the end/line development team, where he serves as the one of two Community Managers, overseeing both the twitter page and the project blog.

**Back-end Developer**

Brian Hamilton is a MALS student at the CUNY Graduate Center, studying digital humanities and data visualization. He has a BS in information technology and web science from Rensselaer Polytechnic Institute, with a concentration in civil engineering. Currently, he works as a web developer and builds full-stack web applications in his spare time. For end/line, Brian is working as the back-end developer. He is responsible for building and maintaining the database, handling the routing of the site, and creating the TEI XML validation scripts.

**Front-end Developer**

Gregory Rocco is currently a graduate student at The Graduate Center (CUNY) studying digital humanities through the MALS program. He currently holds a special honors BA from Hunter College in English with a sub-concentration in environmental studies. His main interest is in exploring the potential of modernist texts through technology. Gregory is an IT specialist, and is currently an associate producer for a children's media company.

**Advisor** 

Kate Singer is an Associate Professor of English at Mount Holyoke College. She has written articles on Percy Shelley, Maria Jane Jewsbury, Mary Robinson, Letitia Landon, and Charlotte Smith that have appeared in Studies in Romanticism, European Romantic Review, Literature Compass, Romantic Circles Praxis, and Essays in Romanticism. The Editor of the Pedagogies section of the Romantic Circles website, including the online journal Pedagogy Commons, she has published on digital pedagogy in JiTP with another essay forthcoming on Letitia Landon in Pedagogy. She edited, along with Nanora Sweet, a special issue of Women’s Writing on Felicia Hemans and is currently finishing a book entitled, Romantic Vacancy: Affect, Gender, and Radical Speculation.

## Budget

[TL]

## Data Management Plan

**Types and Collection**

The project (end/line) is a web application that solicits plain text poetry and TEI XML encodings of that poetry from users. They will enter this information through submission forms on endlineproject.org, a website that we will build using a Bootstrap framework and will be hosted on Heroku. Users of end/line will also be able to search for poems and encodings, invite others to encode a poem, and compare any two encodings of the same poem through a front-end display that highlights their differences. They must create accounts—with email addresses, first/last names, and usernames—in order to submit either plain text poetry or TEI XML encodings. The code for this website will be openly available on GitHub and released under an MIT license.

In addition to the data associated with the website, this project will also maintain a Twitter account, blog, shared Google and Slack accounts, and a Trello account that details the tasks required to release endlineproject.org. Furthermore, the project team will write and a collaborative paper explaining the project upon its completion.

We expect that this project will be of interest to teachers, scholars, and students of the digital humanities and literature.

**Storage and Protection**

We will manage all of this plain text, TEI XML, and user information data through the following SQL tables in a Postgres database:

Poems

id
title
author
text
Posts

id
text
Posted

post_id
u_id
poem_id
date_posted
Users

id
username
password
salt
Profile

u_id
email
name

While neither the plain text poetry submissions nor the TEI XML encodings constitute sensitive data, the data contained in the Users table above do. We will, therefore, hash and encrypt this data using a salt.

**Sustainability and Documentation**

The use of common and standard technologies—plain text, TEI XML, a JavaScript framework like Bootstrap, and SQL—articulate this project’s emphasis on sustainability. Ultimately, however, the CUNY Graduate Center will sustain end/line for one year before reassessing its commitment. At the moment, the Graduate Center has purchased the domain name for this project and may purchase additional Heroku hosting and/or Postgres database storage capabilities.

Regardless of the Graduate Center’s long-term commitment to end/line, the project team will create documentation on data types, collection practices, and storage procedures and post them to the project’s GitHub repository as markdown files. We will also seek to maintain the Twitter account and blog mentioned above and to archive a JSON file of our Trello account (again to the project’s GitHub repository) after the release of endlineproject.org. We will incorporate any relevant information contained in the shared Google or Slack accounts into our documentation. The collaborative paper mentioned above will be published on the project’s GitHub repository as a markdown file.

As project director and project manager, Tom Lewek will be responsible for the implementation of this data management plan.

## Letters of Support

## Appendix: Use Cases

### English or Comparative Literature Professor

Professor Peter Poetics teaches a 200-level class on the study of poetry at a small liberal arts college. He’s interested in multimodal pedagogy but hasn’t come across a decent technique or technology to teach basic poetics digitally. Though he thinks that TEI encoding might help his students understand the hierarchies and techniques at work in many of the works on the syllabus, he feels that existing technologies would be too confusing for non-specialist undergraduates. What he needs is a platform that simplifies encoding through discrete tasks.  

### Digital Humanities Professor

Professor Debbie DH teaches “Digital Humanities 101” at a large state university. Her class provides a multidisciplinary survey of the field, and she tries to incorporate as many praxis-oriented activities as possible into the syllabus. During her week on digital editions and the emergence of the digital humanities in English departments, she wants her students to attempt their own encodings of some documents. Her students have solid computing skills or are acquiring them—they would have no issues using software like Oxygen to complete their encoding assignments. Debbie DH wants an easy way to display these encodings in class, however, in order to chart the subtle changes across submissions. She needs a platform that can archive multiple encodings and display the differences among them through a compelling design.

## Works Cited

“About.” *TAPAS Project.* [http://www.tapasproject.org/about](http://www.tapasproject.org/about).

Howe, Susan. *That This*. New Directions, 2010.

Rybak, Chuck. “Poetry.” *Digital Pedagogy in the Humanities: Concepts, Models, and Experiments*, edited by Rebecca Frost Davis, Matthew K. Gold, Katherine D. Harris, and Jentery Sayers, Modern Language Association, 2016, [https://digitalpedagogy.mla.hcommons.org/keywords/poetry/](https://digitalpedagogy.mla.hcommons.org/keywords/poetry/).

Schreibman, Susan. “Digital Scholarly Editing.” *Literary Studies in the Digital Age*, edited by Kenneth M. Price and Ray Siemens, Modern Language Association, 2013, [https://dlsanthology.mla.hcommons.org/digital-scholarly-editing/](https://dlsanthology.mla.hcommons.org/digital-scholarly-editing/).

Singer, Kate. “Digital Close Reading: TEI for Teaching Poetic Vocabularies.” *The Journal of Interactive Technology and Pedagogy*, no. 3, 15 May 2013, [https://jitp.commons.gc.cuny.edu/digital-close-reading-tei-for-teaching-poetic-vocabularies/](https://jitp.commons.gc.cuny.edu/digital-close-reading-tei-for-teaching-poetic-vocabularies/).

“Verse.” *P5: Guidelines for Electronic Text Encoding and Interchange*, version 3.1.0, 15 December 2016, [http://www.tei-c.org/release/doc/tei-p5-doc/en/html/VE.html](http://www.tei-c.org/release/doc/tei-p5-doc/en/html/VE.html). *Text Encoding Initiative*, [http://www.tei-c.org](http://www.tei-c.org).
