package org.Vexa.model;

public class Genre {
    private Integer genreId;

    private String genreName;

    private String genreIntroduce;

    public Integer getGenreId() {
        return genreId;
    }

    public void setGenreId(Integer genreId) {
        this.genreId = genreId;
    }

    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(String genreName) {
        this.genreName = genreName == null ? null : genreName.trim();
    }

    public String getGenreIntroduce() {
        return genreIntroduce;
    }

    public void setGenreIntroduce(String genreIntroduce) {
        this.genreIntroduce = genreIntroduce == null ? null : genreIntroduce.trim();
    }
}