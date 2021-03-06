import React from 'react';
import QuizEditor from './QuizEditor.jsx';
import './css/MarkdownTutorial.css';

const initialQuiz = `My example quiz
================
This is an example quiz, demonstrating
how you can create your own.

Question I
----------
In which markup language are questions written?

1. !CommonMark Markdown
2. GitHub Markdown
3. reStructuredText

Question II
-----------
Can you use raw HTML in quizzes?

1. Yes
2. No (correct)`;

function MarkdownTutorial(props) {
    const importQuiz = async quiz => {
        await props.api.newQuiz(quiz);
        (props.onAddQuiz || (() => undefined))();
    };

    return (
        <div id="markdownTutorial">
            <h3>How do I make a quiz?</h3>
            Write a quiz file and upload it using the file drop area to the left.
            As for how you make a quiz file, learning by example is probably
            the easiest way to get started.
            <h4>An example quiz</h4>
            <QuizEditor
                lockable={true}
                editing={false}
                initialValue={initialQuiz}
                focus={true}
                api={props.api}
                onSave={importQuiz}
                saveText="Add this quiz to my library"
            />

            <h4>What did I just read?</h4>
            <p>
                Quizzes are written in CommonMark flavour&nbsp;
                <a href="https://commonmark.org/help/tutorial/">Markdown</a>
        &nbsp;without inline HTML, with one quiz per file.
                                         Each file must begin with a heading,
             which is used as the <em>name</em> of the quiz.
             The quiz name may be followed by a description of the quiz,
             which may contain anything <em>except</em> another heading.
             This description is currently ignored, but may be used for
             documentation in the future.
            </p>
            <p>
                After the title and description follows a sequence of questions.
                Each question consists of (in order):
            </p>
            <ul>
                <li>
                    <p>
                        A heading, used as the <em>title</em> of the question.
                        This title is currently ignored, but may be
                        displayed during quizzes in the future.
                    </p>
                </li>
                <li>
                    <p>
                        The <em>body</em> of the question.
                        The question body may contain
                        anything <em>except</em> numbered or bulleted lists.
                    </p>
                </li>
                <li>
                    <p>
                        A bulleted or numbered list of <em>alternatives</em>.
                        Each alternative may contain anything normally
                        allowed in a list item, but we recommend that you
                        stick to plain text or small images.
                    </p>
                    <p>
                        A question may have any number of correct answers.
                        An answer may be marked as <em>correct</em> by
                        surrounding it with [brackets], &#123;braces&#125;,
                        (parentheses) or &lt;angle brackets&gt;, by
                        adding <em>(correct)</em> as a prefix or suffix, an
                        exclamation mark as a prefix,
                        or an arrow (-&gt; or &lt;-) pointing to it.
                    </p>
                </li>
            </ul>
        </div>
    );
}

export default MarkdownTutorial;
