# Newt Contributions

This project is maintained by Newt, checkout out our [website](https://wearenewt.xyz/) for details about the Newt Community with instructions for joining and getting involved.

[Join Discord](discord.gg/newt)

Newt welcomes contributions in all areas: code, ideas, documentation, marketing, and anything else to help the community grow and thrive.

<br />

# re:meme Contributions

A list of tasks can be found on the [Newt homepage](https://wearenewt.xyz/) under the Task List section.

Contributions will mainly be coordinated through the project Discord channel `#config`. Technical contributions also be coordinated through the GitHub [issues](https://github.com/WeAreNewt/config.fyi/issues) tab.

To report a bug, create a new issue with `bug` label. When submitting a bug, please check that issue does not already exist, and provide all relevant details to for reproducing the bug.

To submit a feature request, whether you plan to build it yourself or not, it's usually best to get feedback in order to **scope** the task requirements. To get feedback, create a new issue with the `feedback` label with the feature details, and also reach out in the Discord working channel `#config`.

Some questions to address:

- Will this change require a modification to the smart contracts?
- Will a design be required for frontend changes?

<br />

## Branches

Here is the branch layout for a new feature requiring a change accross multiple packages:

    feature/add-field-api \
    feature/add-field-contracts ->  feature/add-field  -> staging -> main
    feature/add-field-frontend /

All pull requests to `main` require approval from at least 2 members of the Newt core team