# InstaPro Trello Task

##### Masoud Alali

### Description

This project is based on task and requirements from InstaPro team limited to `4 hours` time period

* I used `yarn` for package management
* `create-react-app` is starting point
* I didn't use any navigation library due to project requirements which is trello without any `auth` or any other pages
* Template I used for this application is `typescript` template of `CRA`
* I added `scss` to project for easier styling
* There is no other libraries except `ReactJS`, `uuid` and `moment`
    * `moment`[^1] for show some dates in better style
    * `uuid` for managing cards and boards
* some parts of logics in this application should be handled by backend, but I tried to manage them locally, so some
  parts in real application will be removed
* Structure is something like `NextJS` project which all pages are in `pages` directory, so migration will be easier
* I used some kind of transformers in `objects` which is factory pattern, but it can also be Classes like `OOP`, it will
  help us to handle API object changes easier to manager
* for `rename` cards and boards, just click on that title, it will do the job

### How to start

* Clone the repo
* install dependencies

```shell
yarn
```

* start project

```shell
yarn start
```

### How I did it

I was supposed to commit frequently, but I started and focused and didn't do that, and sorry about it, also it didn't
take more than `4 hours`<br/>
so I will write here about how I did it to somehow describe steps I took

1. I started with `create-react-app` with `typescript` template and installing `sass`
2. then I worked on `boardService` which is responsible to manage logics about `card managements`, I developed basic
   functionalities like `addBoard`, `addCardToBoard`, etc ...
3. then I developed some wrapper for `localStorage` to be my new `storageService` which is responsible for `persist`
   data
4. I changed my `boardService` to work with `storageService`
5. in this step I started working on UI with core elements like `Board`, `Card`, `BoardsContainer`
6. I tested functionalities in this step with mock data to see how `boardService` is working
7. after this step I needed some general components to be reused for `edit` and `add` flow, these components
   are `Select`, `Input` and `Modal`
8. I needed some kind of structure to update my components based on `boardService` state which is not redux, so I
   implemented some `event` and `listener` structure in that service[^2]
9. to have some kind of `single source of truth` and `reactive` structure with connection to `boardService` I
   implemented `DashboardBoardsContext` using `React.createContext` and used it in different component with `useContext`
   api, so `DashboardBoardsProvider` is responsible to provide needed data and functions to handle data manipulations
10. I connected components to related data and added functionalities I needed there
11. in this step I needed to render and open a `Modal` but again instead of redux I used `event` and `listener`s to
    handle opening and showing modal content, it's in `modalService`
12. at the end I did some testing and adding functionalities like `removeBoard` and `removeCard`
13. fixed some issues and that's it
14. writing this README was the last step

### Project structure

* `components`: Some general and shared components to be reused in different components
    * `Button`
    * `Input`
    * `Modal`
* `objects`: Some transformers and data models to transform API responses to client models
    * It can be multi layer if application gets bigger
    * It can reduce cost of API changes
    * We can handle any transformation of data and fields here
* `pages`: It's a directory to put pages components there, and it's based on what we have in `NextJS`
    * It can reduce cost of migration to `NextJS`
    * It can help us find page related components
* `providers`: All context and their providers will be here
    * `DashboardBoardsProvider`
* `services`: Some services and tools in singleton pattern to provide us functionalities we need in application logics
    * `BoardService`: responsible for managing trello-like logics and providing different functionalities to be used in
      different components
    * `ModalService`: responsible to manage open and hide modal
    * `StorageService`: responsible to manage our chosen storage manager, here it's just a wrapper to `localStorage` and
      handles `JSON` data transformation, it can be improved by providing default value in `get` method for example
* `styles`: directory to contain some general styles
    * `colors.scss`: contains some color variables to be used in different classes, it can be css variables but here
      because we don't have customizations and real time changes they are just `scss` variables
    * `sizes.scss`: contains some sizes to be used in different classes and calculations, again these can be css
      variables but here I didn't need them and I just used `scss` variables
* `types`: here I gathered all typescript interfaces and general types, easier to find and manage, also in bigger
  projects we should separate file or directories based on domain and scope
* `utilities`: some utility functions can be placed here, currently I just needed `date` utility

### Future developments

Here we have a project which is developed in max `4 hours` and of course we can improve it a lot,

for develop this project to be a real `Trello` I can think of below points:

* Add some navigation tools to have some pages like profile, settings, auth, etc...
    * It can be `react-navigation` which is easy to use in single page applications
    * It can also be considered in bigger scope, and we can use `NextJS`
        * if we gonna have some SEO content
        * or it can help us to have good structure to develop it in a team which everyone will follow patterns offered
          by `NextJS`
        * It can have some internal[^3] data fetching
        * etc ...
* Improve designs a lot to make it more beautiful and user-friendly, and make it responsive
* Improve models like `Card` and `Board` to have some parts like `Due date` and `ETA` and file and image attachments,
  etc...
* Add more functionalities like `user-management`, `permission-management`, `share`, `mention`, `assignment` and other
  cool features
* Adding some more meaningful interactions like `drag-and-drop`, `context-menus`, ...
* Add some customizations like theme, notifications, eta options and so on
* Change and complete `manifest.json` and `favicon` to have good PWA
* Improve `meta tags` and `robots.txt` to improve SEO related content
* Adding another service name `EventEmitter` and remove `event`-`listener` functionalities from current services
* Integrate data layer to API server and implement `API` service which can be something like `Axios` and implement
  it's `interceptor`s to handle authorizations and errors
* Adding some sort of css libraries like `Tailwind` to create components easier and more performant, also it has `JIT`
  which gives us more flexibility and reduce final bundle size by removing unused classes and of course we have much
  less css codes
* Adding some unit test and storybook and test case scenarios to be more sure about maintainability and be more
  confident in
  deployments
* Some better error handling and adding toast and so on
* Adding some tutorial and helps to onboard user
* Adding accessibility attributes
* Check performance of methods, animations and layers, we can use `lighthouse` and other tools
* Optimize Images and requests
* prefetch, suspense and debounce wherever we need it
* use libraries like `Immutable` to remove some extra logics which can be handled in that library in good performance
* etc...

[^1]: Here we don't necessarily need `MomentJS`, because our use-case is not too much to cover bundle size increase
issue 

[^2]: It could be in separate service like `EventEmitter` service and would be used in Modal too, but time was limited

[^3]: Server to Server, independent of user network conditions page can be rendered in Server and user just fetch HTML
