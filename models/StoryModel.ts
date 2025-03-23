export type Story = {
    locale: string,
    caracters: Array<string>,
    mainCaracter: string,
    places: Array<string>,
    ageRange: number,
    time: number,
    genres: Array<string>,
    moral: boolean,
    content?: string
}