<script lang="ts">

    import {onMount} from "svelte";
    import Icon from "@iconify/svelte";

    let total_seconds = $state(-1)

    let seconds = $derived(total_seconds % 60)
    let minutes = $derived(Math.floor(total_seconds / 60))

    let interval: NodeJS.Timeout
    let audio: HTMLAudioElement

    function start() {

        if (total_seconds === 0) {
            return
        }

        audio.load()

        total_seconds -= 1

        interval = setInterval(() => {

            if (total_seconds === 0) {
                audio.play()
                clearInterval(interval)
            } else {
                total_seconds -= 1
            }

        }, 1_000)
    }

    function pause() {
        clearInterval(interval)
        audio.pause()
    }

    function stop() {
        clearInterval(interval)
        audio.pause()
        total_seconds = 0
    }

    function addTime(seconds: number) {
        let max_seconds = 60 * 60
        total_seconds = Math.min(total_seconds + seconds, max_seconds);
    }

    $effect(() => {
        if (total_seconds < 0) {
            return
        }
        setCookie('seconds', total_seconds, 7)
    })

    function setCookie(name: string, value: number, days: number) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    onMount(() => {

        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('seconds='))
            ?.split('=')[1];

        if (cookieValue) {
            total_seconds = parseInt(cookieValue);
        } else {
            total_seconds = 0
        }

    });
</script>

<audio src="https://cdn.freesound.org/previews/250/250629_4486188-lq.mp3" bind:this={audio} ></audio>

<div class="flex items-center justify-center min-h-screen flex-col -mt-8">

    <img src="/logo.png" class="w-2/3 mb-8" alt="">

    <div class="flex space-x-4 mb-4">
        <button onclick="{() => addTime(60)}" class="btn btn-outline">+1 min</button>
        <button onclick="{() => addTime(60 * 5)}" class="btn btn-outline btn-primary">+5 min</button>
        <button onclick="{() => addTime(60 * 10)}" class="btn btn-outline btn-secondary">+10 min</button>
        <button onclick="{() => addTime(60 * 15)}" class="btn btn-outline btn-accent">+15 min</button>
    </div>

    <div class="grid auto-cols-max grid-flow-col gap-5 text-center">

        <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
            <span class="countdown font-mono text-9xl">
              <span style="--value:{minutes};"></span>
            </span>
            min
        </div>

        <div class="bg-neutral rounded-box text-neutral-content flex flex-col p-2">
            <span class="countdown font-mono text-9xl">
              <span style="--value:{seconds};"></span>
            </span>
            sec
        </div>

    </div>

    <div class="flex space-x-4 mt-4">
        <div class="tooltip tooltip-bottom" data-tip="start">
            <button onclick="{() => start()}" class="btn btn-success">
                <Icon icon="mingcute:play-fill"/>
            </button>
        </div>
        <div class="tooltip tooltip-bottom" data-tip="pause">
            <button onclick="{() => pause()}" class="btn btn-warning">
                <Icon icon="mingcute:pause-fill"/>
            </button>
        </div>
        <div class="tooltip tooltip-bottom" data-tip="stop">
            <button onclick="{() => stop()}" class="btn btn-error">
                <Icon icon="mingcute:stop-fill"/>
            </button>
        </div>
    </div>
</div>