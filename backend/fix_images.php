<?php
$files = [
    'ProfileResource.php' => ['img'],
    'AchievementResource.php' => ['image'],
    'CareerResource.php' => ['logo'],
    'EducationResource.php' => ['logo'],
    'GalleryResource.php' => ['src'],
    'ProjectResource.php' => ['image'],
    'SkillResource.php' => ['icon'],
];

$dir = __DIR__ . '/app/Filament/Resources/';

foreach ($files as $file => $fields) {
    $path = $dir . $file;
    if (file_exists($path)) {
        $content = file_get_contents($path);
        
        foreach ($fields as $field) {
            // Replace in Form
            $patternForm = "/Forms\\\\Components\\\\TextInput::make\('$field'\)(.*?);/s";
            $content = preg_replace_callback($patternForm, function($matches) use ($field) {
                return "Forms\\Components\\FileUpload::make('$field')->image()" . str_replace("->maxLength(255)", "", $matches[1]) . ";";
            }, $content);
            
            // Replace in Table
            $patternTable = "/Tables\\\\Columns\\\\TextColumn::make\('$field'\)(.*?);/s";
            $content = preg_replace_callback($patternTable, function($matches) use ($field) {
                return "Tables\\Columns\\ImageColumn::make('$field')" . str_replace("->searchable()", "", $matches[1]) . ";";
            }, $content);
        }
        
        // Special case for ProjectResource multiple images
        if ($file === 'ProjectResource.php') {
            $content = str_replace(
                "Forms\\Components\\Textarea::make('images')",
                "Forms\\Components\\FileUpload::make('images')->multiple()->image()",
                $content
            );
        }
        
        file_put_contents($path, $content);
        echo "Updated $file\n";
    }
}
