import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import log from "./log";

import { setProjectTitle } from "../reducers/project-title";
import { setAuthor, setDescription } from "../reducers/tw";

export const fetchProjectMeta = async (projectId) => {
    const url = `https://projects.penguinmod.com/api/v1/projects/getproject?requestType=metadata&safe=true&projectID=${projectId}`;
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) {
        return data;
    }
    if (res.status === 404) {
        throw new Error("Project is probably unshared");
    }
    throw new Error(`Unexpected status code: ${res.status}`);
};

const getNoIndexTag = () =>
    document.querySelector('meta[name="robots"][content="noindex"]');
const setIndexable = (indexable) => {
    if (indexable) {
        const tag = getNoIndexTag();
        if (tag) {
            tag.remove();
        }
    } else if (!getNoIndexTag()) {
        const tag = document.createElement("meta");
        tag.name = "robots";
        tag.content = "noindex";
        document.head.appendChild(tag);
    }
};

const TWProjectMetaFetcherHOC = function (WrappedComponent) {
    class ProjectMetaFetcherComponent extends React.Component {
        componentDidUpdate(prevProps) {
            // project title resetting is handled in titled-hoc.jsx
            if (this.props.reduxProjectId !== prevProps.reduxProjectId) {
                this.props.onSetAuthor("", "");
                this.props.onSetDescription("", "");
                const projectId = this.props.reduxProjectId;

                if (projectId === "0") {
                    // don't try to get metadata
                } else {
                    fetchProjectMeta(projectId)
                        .then((data) => {
                            // If project ID changed, ignore the results.
                            if (this.props.reduxProjectId !== projectId) {
                                return;
                            }

                            const title = data.title;
                            if (title) {
                                this.props.onSetProjectTitle(title);
                            }
                            const authorName = data.author.username;
                            const authorThumbnail = `https://projects.penguinmod.com/api/v1/users/getpfp?username=${authorName}`;
                            this.props.onSetAuthor(authorName, authorThumbnail);
                            const instructions = data.instructions || "";
                            const notes = data.notes || "";
                            if (instructions || notes) {
                                this.props.onSetDescription(
                                    instructions,
                                    notes,
                                );
                            }
                            setIndexable(true);
                        })
                        .catch((err) => {
                            setIndexable(false);
                            if (`${err}`.includes("unshared")) {
                                this.props.onSetDescription(
                                    "unshared",
                                    "unshared",
                                );
                            }
                            log.warn("cannot fetch project meta", err);
                        });
                }
            }
        }
        render() {
            const {
                /* eslint-disable no-unused-vars */
                reduxProjectId,
                onSetAuthor,
                onSetDescription,
                onSetProjectTitle,
                /* eslint-enable no-unused-vars */
                ...props
            } = this.props;
            return <WrappedComponent {...props} />;
        }
    }
    ProjectMetaFetcherComponent.propTypes = {
        reduxProjectId: PropTypes.string,
        onSetAuthor: PropTypes.func,
        onSetDescription: PropTypes.func,
        onSetProjectTitle: PropTypes.func,
    };
    const mapStateToProps = (state) => ({
        reduxProjectId: state.scratchGui.projectState.projectId,
    });
    const mapDispatchToProps = (dispatch) => ({
        onSetAuthor: (username, thumbnail) =>
            dispatch(
                setAuthor({
                    username,
                    thumbnail,
                }),
            ),
        onSetDescription: (instructions, credits) =>
            dispatch(
                setDescription({
                    instructions,
                    credits,
                }),
            ),
        onSetProjectTitle: (title) => dispatch(setProjectTitle(title)),
    });
    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(ProjectMetaFetcherComponent);
};

export { TWProjectMetaFetcherHOC as default };
