import { createStore } from 'vuex'
import { project, getoneproject } from '../api'
const state = {
    layers: [],
    projects: [],
    token: null,
    total: 0,
    scal: 0,
    initialProject: "",
    caliber: 0
}

const mutations = {
    up(state, paylod) {
        state.layers[paylod[0]].pos += paylod[1]
        state.layers[0].dur += paylod[2]
    },
    token(state, paylod) {
        state.token = paylod
    },
    total(state) {
        state.total = state.layers.reduce((a, b) => {
            return a + b.dur;
        }, 0);
    },
    zom(state, paylod) {
        if (paylod == "up" && state.scal < 2) state.scal += 0.1
        if (paylod == "down" && state.scal > 0) state.scal -= 0.1
    },
    pick(state, paylod) {
        state.layers = state.projects.map((el) => { if (el.id == paylod) return el.layer }).filter(el => el).flat()
    },
    addlayer(state, paylod) {
        const newobj = [paylod, ...JSON.parse(JSON.stringify(state.layers.flat()))]
        state.layers = newobj
    },
    caliber(state, paylod) {
        state.caliber = paylod
    },


    async project(state, paylod) {
        let res = []
        //if  paylod equal to undifined mean that the finction was trigerd by onMountrd and we don't went trigger the fiche data every time we click render
        if (paylod == undefined) {
            const projects = await project()
            for (let project in projects) {
                res.push({ id: projects[project], name: project })
                res.name = project
                res.id = projects[project]
            }
            state.projects = res
        } else res = state.projects

        const user = JSON.parse(localStorage.getItem("user"))
        // render projet to the layers player if we click button ren or render the first project of the list 
        if (user && res.length) {
            const [rerender] = [... await getoneproject(paylod != undefined ? paylod : res[0]?.id)]

            state.layers = rerender?.layer != ""
                ? JSON.parse(rerender.layer).map((el) => { return { pos: Number(el.pos), dur: Number(el.dur) } })
                : []

            state.initialProject = paylod != undefined
                ? { name: res[paylod]?.name, id: res[paylod]?.id }
                : { name: res[0]?.name, id: res[0]?.id }

            state.total = state.layers.reduce((a, b) => {
                return a + b.dur;
            }, 0);
        }
    }
}

const actions = {
    project(context, paylod) {
        context.commit('project', paylod)
    }
}

export default createStore({
    state,
    mutations,
    actions,
})