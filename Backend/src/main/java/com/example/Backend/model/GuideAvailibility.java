package com.example.Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "GuideAvailibility")
public class GuideAvailibility
{
    @Id
    private String availId;
    private String guideId;
    private int count;

    public GuideAvailibility() {
    }

    public GuideAvailibility(String availId, String guideId, int count) {
        this.availId = availId;
        this.guideId = guideId;
        this.count = count;
    }

    public String getAvailId() {
        return availId;
    }

    public void setAvailId(String availId) {
        this.availId = availId;
    }

    public String getGuideId() {
        return guideId;
    }

    public void setGuideId(String guideId) {
        this.guideId = guideId;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

}
