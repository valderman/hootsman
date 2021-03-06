import React, { useState } from 'react';
import QuizList            from './QuizList.jsx';
import Presenter           from './Presenter.jsx';
import MarkdownTutorial    from './MarkdownTutorial.jsx';
import QuizEditor from './QuizEditor.jsx';

function HomePage(props) {
    const [selectedQuiz, selectQuiz] = useState(undefined);
    const [tick, setTick] = useState(0);
    return (
        <main className="homePage">
            <h1>Congratulations, you're logged in!</h1>
            <h3>&mdash; Uh, great, so what do I do now?</h3>
            <p>
                Great question! We're planning to add a bunch of features to
                make this app more fun-friendly (think music quizzes,
                pub quizzes, etc.), but for now it's mainly useful
                for adding interactive quizzes to your lectures.
            </p>
            <div className="widgets">
                <div className="left">
                    <div>
                        <h3>Your quizzes</h3>
                        <QuizList
                            api={props.api}
                            onSelect={selectQuiz}
                            tick={tick}
                        />
                    </div>
                </div>
                <div className="right">
                    {!selectedQuiz &&
                        <MarkdownTutorial
                            api={props.api}
                            onAddQuiz={() => setTick(tick+1)}
                        />
                    }
                    {selectedQuiz &&
                        <div>
                            <h3>Preview</h3>
                            <Presenter
                               api={props.api}
                               preview={true}
                               id={selectedQuiz.quizId}
                               key={selectedQuiz.quizId}
                               tick={tick}
                            />
                            <h3>Edit quiz</h3>
                            <QuizEditor
                                editing={true}
                                initialValue={selectedQuiz.rawQuizText}
                                api={props.api}
                                onSave={async q => {
                                    await props.api.overwriteQuiz(selectedQuiz.quizId, q);
                                    setTick(tick+1);
                                }}
                            />
                       </div>
                    }
                </div>
            </div>
        </main>
    );
}

export default HomePage;
