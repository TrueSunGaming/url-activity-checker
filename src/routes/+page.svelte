<script lang="ts">
    let files: FileList;
    let result = "";

    async function check() {
        const invalid: [string, string][] = await (await fetch("/api/check-urls", {
            method: "POST",
            body: await files[0].text()
        })).json();

        result = invalid.map((v) => `${v[0]} (${v[1]})`).join("<br>");
    }
</script>

<input type="file" bind:files>

<button on:click={ check }>Check</button>

<div>{ @html result }</div>